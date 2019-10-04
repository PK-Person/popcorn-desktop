(function (App) {
    'use strict';

    // use of darwin string instead of mac (mac os x returns darwin as platform)
    var ButtonOrder = {
        'win32': ['min', 'max', 'close'],
        'darwin': ['close', 'min', 'max'],
        'linux': ['min', 'max', 'close']
    };

    var TitleBar = Marionette.View.extend({
        getTemplate: function(){
            if (process.platform === 'win32') {
                return '#win-header-tpl';
            } else {
                return '#header-tpl';
            }
        },

        events: {
            'click .btn-os.os-max': 'maximize',
            'click .btn-os.os-min': 'minimize',
            'click .btn-os.os-close': 'closeWindow',
            'click .btn-os.fullscreen': 'toggleFullscreen',
            'click .window-minimize': 'minimize',
            'click .window-maximize': 'maximize',
            'click .window-close': 'closeWindow'
        },

        initialize: function () {
            this.nativeWindow = win;
        },

        templateContext: {
            getButtons: function () {
                return ButtonOrder[App.Config.platform];
            },

            fsTooltipPos: function () {
                return App.Config.platform === 'darwin' ? 'left' : 'right';
            },

            events: function () {
                var date = new Date();
                var today = ('0' + (date.getMonth() + 　1)).slice(-2) + ('0' + (date.getDate())).slice(-2);
                if (today === '1231' || today === '0101') {
                    return 'newyear';
                } else if (today >= '1218' || today <= '0103') {
                    return 'xmas';
                } else if (today >= '1027' && today <= '1103') {
                    return 'halloween';
                } else if (today === '0220') {
                    return 'pt_anniv';
                } else if (today === '0214') {
                    return 'stvalentine';
                } else if (today === '0317') {
                    return 'stpatrick';
                } else if (today === '0401') {
                    return 'aprilsfool';
                }
            }
        },

        maximize: function () {

            if (this.nativeWindow.isFullscreen) {
                this.nativeWindow.toggleFullscreen();
            } else {
                setTimeout(() => {
                    if (this.nativeWindow.appWindow.isMaximized()) {
                        this.nativeWindow.restore();
                    } else {
                        this.nativeWindow.maximize();
                    }
                }, 0);
                if (process.platform !== 'win32') {
                    this.nativeWindow.resizeBy(1, 0);
                    this.nativeWindow.resizeBy(-1, 0);
                }
            }
        },

        minimize: function () {
            var that = this.nativeWindow;
            if (AdvSettings.get('minimizeToTray')) {
                minimizeToTray();
            } else {
                that.minimize();
            }
        },

        closeWindow: function () {
            this.nativeWindow.close();
        },

        toggleFullscreen: function () {            
            this.nativeWindow.toggleFullscreen();            
            this.$el.find('.btn-os.fullscreen').toggleClass('active');
        },

        onAttach: function () {
            $('.tooltipped').tooltip({
                delay: {
                    'show': 800,
                    'hide': 100
                }
            });
        }

    });

    App.View.TitleBar = TitleBar;
})(window.App);
