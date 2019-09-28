(function (App) {
    'use strict';

    var client = App.WebTorrent,
        CHANNELS = ['stable', 'beta', 'nightly'],
        FILENAME = 'popcorntime.new',
        VERIFY_PUBKEY = Settings.updateKey;

    function forcedBind(func, thisVar) {
        return function () {
            return func.apply(thisVar, arguments);
        };
    }

    function Updater(options) {
        if (!(this instanceof Updater)) {
            return new Updater(options);
        }

        var self = this;

        this.options = _.defaults(options || {}, {
            endpoint: AdvSettings.get('updateEndpoint').url + 'updatemagnet.json' + '?version=' + App.settings.version + '&nwversion=' + process.versions['node-webkit'],
            channel: 'beta'
        });

        this.outputDir = path.join(os.tmpdir(), FILENAME);
        win.info(this.outputDir);
        this.updateData = null;
    }

    Updater.prototype.check = function () {
        var defer = Q.defer();
        var promise = defer.promise;
        var self = this;

        // Don't update if development or update disabled in Settings
        request(this.options.endpoint, {
            json: true
        }, function (err, res, data) {
            if (err || !data) {
                defer.reject(err);
            } else {
                defer.resolve(data);
            }
        });

        return promise.then(function (data) {
            if (!_.contains(Object.keys(data), App.settings.os)) {
                // No update for this OS, FreeBSD or SunOS.
                // Must not be an official binary
                return false;
            }

            var updateData = data[App.settings.os];
            if (App.settings.os === 'linux') {
                updateData = updateData[App.settings.arch];
            }

            // Update has more than just src & modules
            updateData.extended = data.extended || false;

            // Normalize the version number
            if (!updateData.version.match(/-\d+$/)) {
                updateData.version += '-0';
            }
            if (!App.settings.version.match(/-\d+$/)) {
                App.settings.version += '-0';
            }

            if (semver.gt(updateData.version, App.settings.version)) {
                win.debug('Updating to version %s', updateData.version);
                self.updateData = updateData;
                return true;
            }
            if (App.settings.UpdateSeed) {
              client.add(updateData.updateUrl, { path: os.tmpdir() }, function (torrent) {
                torrent.addWebSeed(self.updateData.sourceUrl);
                torrent.on('error', function (err) {
                    win.debug('ERROR' + err.message);
                });
                torrent.on('done', function () {
                    win.debug('Seeding the Current Update!');
                });
              });

            }
            win.debug('Not updating because we are running the latest version');
            return false;
        });
    };

    Updater.prototype.download = function (source, outputDir) {
        var defer = Q.defer();
        var self = this;

        win.info(source, outputDir);
        client.on('error', function (err) {
          win.debug('ERROR: ' + err.message);
            defer.reject(err);
        });

        client.add(source, { path: outputDir }, function (torrent) {
            win.debug('Downloading update... Please allow a few minutes');
            torrent.addWebSeed(self.updateData.sourceUrl);
            torrent.on('error', function (err) {
                win.debug('ERROR' + err.message);
                defer.reject(err);
            });

            torrent.on('done', function () {
                win.debug('Update downloaded!');
                defer.resolve(path.join(outputDir, torrent.name));
            });

            torrent.on('download', function (bytes) {
              win.info('Download speed: ' + torrent.downloadSpeed)
            })
        });

        return defer.promise;
      };

    Updater.prototype.verify = function (source) {
        var defer = Q.defer();
        var self = this;
        win.debug('Verifying update authenticity with SDA-SHA1 signature...');

        var hash = crypt.createHash('SHA1'),
            verify = crypt.createVerify('SHA1');

        var readStream = fs.createReadStream(source);
        readStream.pipe(hash);
        readStream.pipe(verify);
        readStream.on('end', function () {
            hash.end();
            if (
                self.updateData.checksum !== hash.read().toString('hex') ||
                verify.verify(VERIFY_PUBKEY, self.updateData.signature, 'base64') === false
            ) {
                defer.reject('invalid hash or signature');
            } else {
                win.debug('Update was correctly signed and is safe to install!');
                defer.resolve(source);
            }
        });
        return defer.promise;
    };

    // Extended: false
    function extractSimple(pack, updateData, downloadPath) {
        var installDir = path.dirname(downloadPath);
        var defer = Q.defer();

        pack.on('ready', () => {
          pack.close();
          return defer.resolve({ path: installDir, file: downloadPath, description: 'Reload to install.', title: `New Version ${updateData.version} Downloaded` });

          pack.extract(null, installDir, (err, count) => {
            win.error(err ? 'Extract error' : `Extracted ${count} entries`);
            pack.close();
            if (err) {
              return defer.reject(err)
            }

            return defer.resolve({ path: installDir, file: downloadPath, description: 'Reload to install.', title: `New Version ${updateData.version} Downloaded` });
          });
        });

        return defer.promise;
    }

    function installPackage(downloadPath, outputDir, updateData) {
        win.debug('Extracting update...');

        var packageFile = path.join(outputDir, 'package.nw'),
            pack = new StreamZip({
              file: downloadPath,
              storeEntries: true
            });

        return extractSimple(pack, updateData, downloadPath);
    }

    function installWindows(downloadPath, updateData) {
        return installPackage(downloadPath, path.dirname(downloadPath), updateData);
    }

    function installLinux(downloadPath, updateData) {
        return installPackage(downloadPath, path.dirname(downloadPath), updateData);
    }

    function installOSX(downloadPath, updateData) {
        var outputDir = updateData.extended ? process.cwd().split('Contents')[0] : path.dirname(downloadPath);

        return installPackage(downloadPath, outputDir, updateData);
    }

    function alertMessageFailed(errorDesc) {
        App.vent.trigger('notification:show', new App.Model.Notification({
            title: i18n.__('Error'),
            body: errorDesc + '.',
            type: 'danger',
            autoclose: true
        }));
    }

    Updater.prototype.install = function (downloadPath) {
        var os = App.settings.os;
        var promise;
        if (os === 'windows') {
            promise = installWindows;
        } else if (os === 'linux') {
            promise = installLinux;
        } else if (os === 'mac') {
            promise = installOSX;
        } else {
            return Q.reject('Unsupported OS');
        }

        return promise(downloadPath, this.updateData);
    };

    Updater.prototype.displayNotification = function (data) {
        var self = this;
        var showRestart = false;
        var buttons = [{
            title: 'Changelog',
            action: onChangelogClick
        }];

        function onChangelogClick() {
            var $changelog = $('#changelog-container').html(_.template($('#changelog-tpl').html())(self.updateData));
            $changelog.find('.btn-close').on('click', function () {
                $changelog.hide();
            });
            $changelog.show();
        }

        function onRestartClick() {
            wUpdater.runInstaller(data.path, [wUpdater.getAppPath(), wUpdater.getAppExec(), data.file],{});
            nw.App.quit();
        }

        if (data.title.indexOf('Downloaded') != -1) {
          buttons.push({
              title: 'Reload',
              action: onRestartClick
          })
        } else if (data.title.indexOf('Installed') != -1) {
          showRestart = true;
        }

        App.vent.trigger('notification:show', new App.Model.Notification({
            title: data.title,
            body: data.description,
            showRestart: showRestart,
            type: 'info',
            buttons: buttons
        }));
    };

    Updater.prototype.update = function () {
        // Args passed when new app is launched from temp dir during update
        var copyPath, execPath, newVersionZipFile;
        if (nw.App.argv.length) {
            var self = this;
            var defer = Q.defer();
            var promise = defer.promise;

            // ------------- Step 5 -------------
            copyPath = nw.App.argv[0];
            execPath = nw.App.argv[1];
            newVersionZipFile = nw.App.argv[2];

            win.info(`CopyPath: ${copyPath} execPath: ${execPath}, update file: ${newVersionZipFile}`);
            win.info(`Current Path: ${[wUpdater.getAppPath(), wUpdater.getAppExec()]}`);
            // Replace old app, Run updated app from original location and close temp instance
            var pack = new StreamZip({
              file: newVersionZipFile,
              storeEntries: true
            });

            pack.on('ready', () => {
              pack.extract(null, copyPath, (err, count) => {
                win.error(err ? 'Extract error' : `Extracted ${count} entries`);
                pack.close();
                if (err) {
                  return defer.reject(err)
                }

                win.info(`Finish update and copy, restart`);
                self.displayNotification({path: execPath, file: null, description: 'Restart is required', title: `New Version ${App.settings.version} Installed`});
                defer.resolve();
              });
            });

            return defer.promise;
        }

        var outputFile = path.join(path.dirname(this.outputDir), FILENAME);
        if (this.updateData) {
            // If we have already checked for updates...
            return this.download(this.updateData.updateUrl, outputFile)
                .then(forcedBind(this.verify, this))
                .then(forcedBind(this.install, this))
                .then(forcedBind(this.displayNotification, this))
                .catch(function(err) {
                  alertMessageFailed(i18n.__('Something went wrong downloading the update'));
                });
        } else {
            // Otherwise, check for updates then install if needed!
            var self = this;
            return this.check().then(function (updateAvailable) {
                if (updateAvailable) {
                    return self.download(self.updateData.updateUrl, outputFile)
                        .then(forcedBind(self.verify, self))
                        .then(forcedBind(self.install, self))
                        .then(forcedBind(self.displayNotification, self))
                        .catch(function(err) {
                          win.info(`Something went wrong downloading the update: ${err.message}`)
                          alertMessageFailed(i18n.__('Something went wrong downloading the update'));
                        });
                } else {
                    return false;
                }
            });
        }
    };

    App.Updater = Updater;

})(window.App);
