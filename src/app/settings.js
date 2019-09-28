/** Default settings **/
var Settings = {
    projectName: 'Popcorn-Time',
    projectUrl: 'https://popcorn-api.io',
    projectTwitter: 'popcorntimeiotv',
    projectFacebook: 'PopcornTimedotIo',
    projectGooglePlus: 'PopcornTimedotIo',
    projectBlog: 'https://blog.popcorn-api.io/',
    projectForum: 'https://www.reddit.com/r/ButterProject',

    statusUrl: 'https://status.popcorn-api.io',
    changelogUrl: 'https://github.com/ziro-official/butter-desktop/commits/master',
    issuesUrl: 'https://github.com/ziro-official/butter-desktop/issues',
    sourceUrl: 'https://github.com/ziro-official/butter-desktop/',
    commitUrl: 'https://github.com/ziro-official/butter-desktop/commit',
    updateKey: '-----BEGIN PUBLIC KEY-----\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuAHq1Uz/dLblqMdmJALW\n' +
        'VgHuUukx3pLnhFUp6Tm2jMCG7SvXnSp748rnON8T4+7Sg1gHjwBfnpVnZbdpOcGs\n' +
        'Sjj9R5sb6A9FFzz3l0z3dm3pBRQkRavSsAnWapR90Lssp+frfKwWuv30Kde40ZlJ\n' +
        'f+cMElbEZz7IFo1eLQucr83+KY2ndfG7OgWTLMwiOVEZnZSICq3pWsqoVQWdJ1yf\n' +
        'oKc2Ax99BK63JtI3m82WCgke+0gN8w9fLFi+wJL9ppBu24V3wq1ChfvOzI4cAI2q\n' +
        'VVAWCi44xV0bzTPtUnPPIPgc7+8G1VWHp2JYVmSLSmtpiHFb2bJSrwMijACNVBUr\n' +
        'AwIDAQAB\n' +
        '-----END PUBLIC KEY-----\n',
    opensubtitles: {
        useragent: 'Butter'
    },
    trakttv: {
        client_id: '647c69e4ed1ad13393bf6edd9d8f9fb6fe9faf405b44320a6b71ab960b4540a2',
        client_secret: 'f55b0a53c63af683588b47f6de94226b7572a6f83f40bd44c58a7c83fe1f2cb1'
    },
    tvshowtime: {
        client_id: 'iM2Vxlwr93imH7nwrTEZ',
        client_secret: 'ghmK6ueMJjQLHBwsaao1tw3HUF7JVp_GQTwDwhCn'
    },
    fanart: {
        api_key: '8104b601679c3ec23e7d3e4d93ddb46f'
    },
    tvdb: {
        api_key: '80A769280C71D83B'
    },
    tmdb: {
        api_key: '1a83b1ecd56e3ac0e509b553b68c77a9'
    }
};

Settings.providers = {
    movie: {
        order: 1,
        name: 'Movies',
        uri: ['vodo', 'archive',
          //'stremio?auth={"url":"http://api8.herokuapp.com","key":"423f59935153f2f5d2db0f6c9b812592b61b3737"}&url=http://localhost:9005'
        ]
    },
    tvshow: {
        order: 2,
        name: 'Series',
        uri: [
            'ccc',
            'youtube?channel=HolaSoyGerman',
            'youtube?channel=JulianSerrano7',
            'youtube?channel=LasCronicasDeAlfredo',
            'youtube?channel=maritobaracus',
            'youtube?channel=petercapusottotv&titleRegex=[0-9]+[aª] +Temporada',
            'youtube?channel=sincodificar2',
            'youtube?channel=lady16makeup',
            'youtube?channel=werevertumorro',
            'youtube?channel=DrossRotzank',
            'youtube?channel=DeiGamer',
            'youtube?channel=ReinoMariaElenaWalsh',
            'youtube?channel=LucasCastelvlogs',
            'youtube?channel=thedevilwearsvitton',
            'youtube?channel=elbananeropuntocom',
        ]
    },
    subtitle: 'OpenSubtitles',
    metadata: 'Trakttv',
    tvst: 'TVShowTime',

    torrentCache: 'TorrentCache',
};

Settings.trackers = {
    blacklisted: [
        'demonii'
    ],
    forced: [
        'udp://tracker.leechers-paradise.org:6969/announce',
        'udp://tracker.coppersurfer.tk:6969/announce',
        'udp://glotorrents.pw:6969/announce',
        'udp://exodus.desync.com:6969/announce',
        'udp://tracker.opentrackr.org:1337/announce',
        'udp://9.rarbg.com:2710/announce',
        'udp://tracker.openbittorrent.com:80',
        'udp://tracker.publicbt.com:80/announce',
        'udp://tracker.empire-js.us:1337',
        'wss://tracker.openwebtorrent.com',
        'wss://tracker.fastcast.nz',
        'wss://tracker.btorrent.xyz'
    ]
};

// API Servers
Settings.apiserver = '';

// User interface
Settings.language = '';
Settings.translateSynopsis = true;
Settings.coversShowRating = true;
Settings.watchedCovers = 'fade';
Settings.showAdvancedSettings = false;

Settings.postersMinWidth = 134;
Settings.postersMaxWidth = 294;
Settings.postersMinFontSize = 0.8;
Settings.postersMaxFontSize = 1.3;
Settings.postersSizeRatio = (196 / 134);
Settings.postersWidth = Settings.postersMinWidth;
Settings.postersJump = [134, 154, 174, 194, 214, 234, 254, 274, 294];

//Playback
Settings.alwaysFullscreen = false;
Settings.playNextEpisodeAuto = true;
Settings.chosenPlayer = 'local';

// Advanced UI
Settings.alwaysOnTop = false;
Settings.theme = 'Official_-_Dark_theme';
Settings.ratingStars = true; //trigger on click in details
Settings.hideSeasons = true;
Settings.startScreen = 'Movies';
Settings.lastTab = '';
Settings.rememberFilters = false;

// Quality
Settings.shows_default_quality = '720p';
Settings.movies_default_quality = '1080p';
Settings.moviesShowQuality = false;
Settings.movies_quality = 'all';

// Subtitles
Settings.subtitle_language = 'none';
Settings.subtitle_size = '28px';
Settings.subtitle_color = '#ffffff';
Settings.subtitle_decoration = 'Outline';
Settings.subtitle_font = 'Arial';

// More options
Settings.httpApiPort = 8008;
Settings.httpApiUsername = 'butter';
Settings.httpApiPassword = 'butter';

// Trakt.tv
Settings.traktStatus = false;
Settings.traktLastSync = false;
Settings.traktLastActivities = false;
Settings.traktSyncOnStart = true;
Settings.traktPlayback = true;

// TVShow Time
Settings.tvstAccessToken = '';

// OpenSubtitles
Settings.opensubtitlesAutoUpload = true;
Settings.opensubtitlesAuthenticated = false;
Settings.opensubtitlesUsername = '';
Settings.opensubtitlesPassword = '';

// Advanced options
Settings.connectionLimit = 55;
Settings.streamPort = 0; // 0 = Random
Settings.tmpLocation = path.join(os.tmpDir(), Settings.projectName);
Settings.databaseLocation = path.join(data_path, 'data');
Settings.deleteTmpOnClose = true;
Settings.automaticUpdating = true;
Settings.UpdateSeed = true;
Settings.events = true;
Settings.minimizeToTray = false;
Settings.bigPicture = false;

// Features
Settings.activateTorrentCollection = true;
Settings.activateWatchlist = true;
Settings.activateRandomize = true;
Settings.onlineSearchEngine = 'ExtraTorrent';

// Ratio
Settings.totalDownloaded = 0;
Settings.totalUploaded = 0;

Settings.updateEndpoint = {
    url: 'https://popcorn-api.io/',
    index: 0,
    proxies: [{
        url: 'https://popcorn-api.io/',
        fingerprint: '',
    }, {
        url: 'https://ziro-official.github.io/',
        fingerprint: ''
    }]
};

// App Settings
Settings.version = false;
Settings.dbversion = '0.1.0';
Settings.font = 'tahoma';
Settings.defaultWidth = Math.round(window.screen.availWidth * 0.8);
Settings.defaultHeight = Math.round(window.screen.availHeight * 0.8);

// Miscellaneous
Settings.playerSubPosition = '0px';
Settings.playerVolume = '1';
Settings.tv_detail_jump_to = 'next';


var ScreenResolution = {
    get SD() {
        return window.screen.width < 1280 || window.screen.height < 720;
    },
    get HD() {
        return window.screen.width >= 1280 && window.screen.width < 1920 || window.screen.height >= 720 && window.screen.height < 1080;
    },
    get FullHD() {
        return window.screen.width >= 1920 && window.screen.width < 2000 || window.screen.height >= 1080 && window.screen.height < 1600;
    },
    get UltraHD() {
        return window.screen.width >= 2000 || window.screen.height >= 1600;
    },
    get QuadHD() {
        return window.screen.width >= 3000 || window.screen.height >= 1800;
    },
    get Standard() {
        return window.devicePixelRatio <= 1;
    },
    get Retina() {
        return window.devicePixelRatio > 1;
    }
};

var AdvSettings = {

    get: function (variable) {
        if (typeof Settings[variable] !== 'undefined') {
            return Settings[variable];
        }

        return false;
    },

    set: function (variable, newValue) {
        Database.writeSetting({
                key: variable,
                value: newValue
            })
            .then(function () {
                Settings[variable] = newValue;
            });
    },

    setup: function () {
        AdvSettings.performUpgrade();
        return AdvSettings.getHardwareInfo();
    },

    getHardwareInfo: function () {
        if (/64/.test(process.arch)) {
            AdvSettings.set('arch', 'x64');
        } else {
            AdvSettings.set('arch', 'x86');
        }

        switch (process.platform) {
        case 'darwin':
            AdvSettings.set('os', 'mac');
            break;
        case 'win32':
            AdvSettings.set('os', 'windows');
            break;
        case 'linux':
            AdvSettings.set('os', 'linux');
            break;
        default:
            AdvSettings.set('os', 'unknown');
            break;
        }

        return Q();
    },

    getNextApiEndpoint: function (endpoint) {
        if (endpoint.index < endpoint.proxies.length - 1) {
            endpoint.index++;
        } else {
            endpoint.index = 0;
        }
        endpoint.ssl = undefined;
        _.extend(endpoint, endpoint.proxies[endpoint.index]);
        return endpoint;
    },

    checkApiEndpoints: function (endpoints) {
        return Q.all(_.map(endpoints, function (endpoint) {
            return AdvSettings.checkApiEndpoint(endpoint);
        }));
    },

    checkApiEndpoint: function (endpoint, defer) {
        if (Settings.automaticUpdating === false) {
            return;
        }

        defer = defer || Q.defer();

        endpoint.ssl = undefined;
        _.extend(endpoint, endpoint.proxies[endpoint.index]);

        var _url = url.parse(endpoint.url);
        win.debug('Checking %s endpoint', _url.hostname);

        function tryNextEndpoint() {
            if (endpoint.index < endpoint.proxies.length - 1) {
                endpoint.index++;
                AdvSettings.checkApiEndpoint(endpoint, defer);
            } else {
                endpoint.index = 0;
                endpoint.ssl = undefined;
                _.extend(endpoint, endpoint.proxies[endpoint.index]);
                defer.resolve();
            }
        }

        if (endpoint.ssl === false) {
            var request = http.get({
                hostname: _url.hostname
            }, function (res) {
                res.once('data', function (body) {
                    res.removeAllListeners('error');
                    // Doesn't match the expected response
                    if (!_.isRegExp(endpoint.fingerprint) || !endpoint.fingerprint.test(body.toString('utf8'))) {
                        win.warn('[%s] Endpoint fingerprint %s does not match %s',
                            _url.hostname,
                            endpoint.fingerprint,
                            body.toString('utf8'));
                        tryNextEndpoint();
                    } else {
                        defer.resolve();
                    }
                }).once('error', function (e) {
                    win.warn('[%s] Endpoint failed [%s]',
                        _url.hostname,
                        e.message);
                    tryNextEndpoint();
                });
            }).setTimeout(5000, function () {
				win.warn('[%s] Endpoint timed out',
					_url.hostname);
				request.abort();
				tryNextEndpoint();
            });
        } else {
            tls.connect(443, _url.hostname, {
                servername: _url.hostname,
                rejectUnauthorized: false
            }, function () {
                this.setTimeout(0);
                this.removeAllListeners('error');
                if (!this.authorized ||
                    this.authorizationError ||
                    this.getPeerCertificate().fingerprint !== endpoint.fingerprint) {
                    // "These are not the certificates you're looking for..."
                    // Seems like they even got a certificate signed for us :O
                    win.warn('[%s] Endpoint fingerprint %s does not match %s',
                        _url.hostname,
                        endpoint.fingerprint,
                        this.getPeerCertificate().fingerprint);
                    tryNextEndpoint();
                } else {
                    defer.resolve();
                }
                this.end();
            }).once('error', function (e) {
                win.warn('[%s] Endpoint failed [%s]',
                    _url.hostname,
                    e.message);
                this.setTimeout(0);
                tryNextEndpoint();
            }).once('timeout', function () {
                win.warn('[%s] Endpoint timed out',
                    _url.hostname);
                this.removeAllListeners('error');
                this.end();
                tryNextEndpoint();
            }).setTimeout(5000);
        }

        return defer.promise;
    },

    performUpgrade: function () {
        // This gives the official version (the package.json one)
        var currentVersion = nw.App.manifest.version;

        if (currentVersion !== AdvSettings.get('version')) {
            // Nuke the DB if there's a newer version
            // Todo: Make this nicer so we don't lose all the cached data
            var cacheDb = openDatabase('cachedb', '', 'Cache database', 50 * 1024 * 1024);

            cacheDb.transaction(function (tx) {
                tx.executeSql('DELETE FROM subtitle');
                tx.executeSql('DELETE FROM metadata');
            });

            // Add an upgrade flag
            window.__isUpgradeInstall = true;
        }
        AdvSettings.set('version', currentVersion);
        AdvSettings.set('releaseName', nw.App.manifest.releaseName);
    },
};
