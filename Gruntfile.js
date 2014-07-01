'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-phonegap');
    grunt.loadNpmTasks('grunt-svg2storeicons');
    grunt.loadNpmTasks('grunt-phonegapsplash');
    grunt.loadNpmTasks("grunt-bower-install-simple");
    grunt.loadNpmTasks('grunt-wiredep');

    grunt.registerTask("images", [
        "svg2storeicons",   // compile app icons from src/svg
        "phonegapsplash"    // compile app splash screens from src/png
    ]);

    grunt.registerTask("shipit", [
        "images",
        "phonegap:build",   // create ios build and android apk (non-release)
        "phonegap:release"  // create android ipk (signed release)
    ]);

    grunt.registerTask("android", [
        "phonegap:build:android",
        "phonegap:run:android"
    ]);

    grunt.registerTask("ios", [
        "phonegap:build:ios",
        "phonegap:run:ios"
    ]);

    // for use with phonegap-grunt to automate app builds with phonegap or phonegap-build
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        "bower-install-simple": { options: { color: true, production: false } },
        wiredep: { target: { src: [ 'www/index.html' ] } },

        clean: [
          "build", "plugins/**", "platforms/**",
          "www/platforms", "www/icon.png",
          "!.gitkeep",
        ],

        watch: {
            css: {
                files: [
                  "app/sass/**/*.scss",
                ],
                tasks: ["sass"]
            },
            bower: {
                files: [ "bower.json" ],
                tasks: [ "bower-install-simple" ]
            }
        },

        svg2storeicons: {
            google_play_and_app_store: {
                src: 'app/src/icon.svg',
                dest: 'www/',
                options: {
                    prjName: '<%= pkg.appName %>',
                    profiles: ['default', 'ios', 'android']
                }
            },
        },

        phonegapsplash: {
            all_phones: {
                src: 'app/src/splash.png',
                dest: 'www/',
                options: {
                    prjName: '<%= pkg.appName %>',
                    profiles: ['default', 'ios', 'android']
                }
            }
        },

        sass: {
            dist: {
                options: {
                    includePaths: [ 'www/components/ionic/scss' ],
                    outputStyle: 'nested' // or compressed
                },
                files: {
                    'www/css/app.css': 'app/sass/app.scss'
                }
            }
        },

        phonegap: {
            config: {
                name: '<%= pkg.appName %>',
                releaseName: '<%= pkg.name %>' + '-' + '<%= pkg.version %>',
                root: 'www',
                config: {
                    template: 'app/templates/config.xml',
                    data: {
                        id: '<%= pkg.appId %>',
                        version: '<%= pkg.version %>',
                        appName: '<%= pkg.appName %>'
                    }
                },
                cordova: '.cordova', // Directory that stores cordova settings
                path: 'build', // Directory to build native apps
                releases: 'releases', // Directory to output signed releases
                maxBuffer: 1024, // You may need to raise this for iOS.
                verbose: false,
                debuggable: false,
                plugins: [
                    'https://github.com/phonegap-build/PushPlugin',
                    'org.apache.cordova.statusbar',
                    'org.apache.cordova.console',
                    'org.apache.cordova.device',
                    'org.apache.cordova.device-orientation',
                    'org.apache.cordova.dialogs',
                    'org.apache.cordova.globalization',
                    'org.apache.cordova.media',
                    'org.apache.cordova.network-information',
                    'org.apache.cordova.splashscreen',
                    'org.apache.cordova.contacts'
                ],

                // Add a key if you plan to use the `release:android` task
                // See http://developer.android.com/tools/publishing/app-signing.html
                // key: {
                //     store: 'app/certs/android/itw_mobile.keystore',
                //     alias: 'app_alias',
                //     aliasPassword: function(){
                //         // Prompt, read an environment variable, or just embed as a string literal
                //         return('password');
                //     },
                //     storePassword: function(){
                //         // Prompt, read an environment variable, or just embed as a string literal
                //         return('password');
                //     }
                // },

                // Set an app icon at various sizes (optional)
                icons: {
                    android: {
                        ldpi: 'www/platforms/android/res/drawable-ldpi/icon.png',
                        mdpi: 'www/platforms/android/res/drawable-xhdpi/icon.png',
                        hdpi: 'www/platforms/android/res/drawable-hdpi/icon.png',
                        xhdpi: 'www/platforms/android/res/drawable-xhdpi/icon.png'
                    },
                    ios: {
                        icon29: 'www/platforms/ios/AppName/Resources/icons/icon-small.png',
                        icon29x2: 'www/platforms/ios/AppName/Resources/icons/icon-small@2x.png',
                        icon40: 'www/platforms/ios/AppName/Resources/icons/icon-40.png',
                        icon40x2: 'www/platforms/ios/AppName/Resources/icons/icon-40@2x.png',
                        icon57: 'www/platforms/ios/AppName/Resources/icons/icon-57.png',
                        icon57x2: 'www/platforms/ios/AppName/Resources/icons/icon-57@2x.png',
                        icon60: 'www/platforms/ios/AppName/Resources/icons/icon-60.png',
                        icon60x2: 'www/platforms/ios/AppName/Resources/icons/icon-60@2x.png',
                        icon72: 'www/platforms/ios/AppName/Resources/icons/icon-72.png',
                        icon72x2: 'www/platforms/ios/AppName/Resources/icons/icon-72@2x.png',
                        icon76: 'www/platforms/ios/AppName/Resources/icons/icon-76.png',
                        icon76x2: 'www/platforms/ios/AppName/Resources/icons/icon-76@2x.png',
                    }
                },

                // Set a splash screen at various sizes (optional)
                // Only works for Android and IOS
                 screens: {
                     android: {
                         ldpi: 'www/platforms/android/res/drawable-port-ldpi/screen.png',
                         ldpiLand: 'www/platforms/android/res/drawable-land-ldpi/screen.png',
                         mdpi: 'www/platforms/android/res/drawable-port-mdpi/screen.png',
                         mdpiLand: 'www/platforms/android/res/drawable-land-mdpi/screen.png',
                         hdpi: 'www/platforms/android/res/drawable-port-hdpi/screen.png',
                         hdpiLand: 'www/platforms/android/res/drawable-land-hdpi/screen.png',
                         xhdpi: 'www/platforms/android/res/drawable-port-xhdpi/screen.png',
                         xhdpiLand: 'www/platforms/android/res/drawable-land-xhdpi/screen.png'
                     },
                     ios: {
                         ipadLand: 'www/platforms/ios/AppName/Resources/splash/Default-Landscape~ipad.png',
                         ipadLandx2: 'www/platforms/ios/AppName/Resources/splash/Default-Landscape@2x~ipad.png',
                         ipadPortrait: 'www/platforms/ios/AppName/Resources/splash/Default-Portrait~ipad.png',
                         ipadPortraitx2: 'www/platforms/ios/AppName/Resources/splash/Default-Portrait@2x~ipad.png',
                         iphonePortrait: 'www/platforms/ios/AppName/Resources/splash/Default~iphone.png',
                         iphonePortraitx2: 'www/platforms/ios/AppName/Resources/splash/Default@2x~iphone.png',
                         iphone568hx2: 'www/platforms/ios/AppName/Resources/splash/Default-568h@2x~iphone.png'
                     }
                 },

                // Android-only integer version to increase with each release.
                // See http://developer.android.com/tools/publishing/versioning.html
                versionCode: '<%= pkg.versionCode %>',

                // iOS7-only options that will make the status bar white and transparent
                // iosStatusBar: 'WhiteAndTransparent'
            }
        }
    })

};
