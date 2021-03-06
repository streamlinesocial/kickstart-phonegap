// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'app.controllers', 'app.services'])

.run(function($ionicPlatform, DatabaseService) {
    $ionicPlatform.ready(function() {
        'use strict';

        var force_initialize = true,
            doInitializeCB,
            isInitializedCB;

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }

        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        // Database initilization
        doInitializeCB = function(msg) {
            DatabaseService.doInitialize().then(function(value){
                console.log('Database successfully initialized: ', 'Schema version ' + value);
            }, function(reason) {
                console.log('Database failed to initialized: ' + reason);
            });
        };

        isInitializedCB = function(version){
            console.log('Database already initialized: ', 'Schema version: ' + version);
        };

        if (force_initialize) {
            doInitializeCB('Forcing database initialize (debug)');
        } else {
            // check if the database is initialized, if it fails then
            // doInitializeCB is called
            DatabaseService.isInitialized()
                .then(isInitializedCB, doInitializeCB);
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.stats', {
        url: '/stats',
        views: {
            'tab-stats': {
                templateUrl: 'templates/tab-stats.html',
                controller: 'StatsCtrl'
            }
        }
    })

    .state('tab.contacts', {
        url: '/contacts',
        views: {
            'tab-contacts': {
                templateUrl: 'templates/tab-contacts.html',
                controller: 'ContactsCtrl'
            }
        }
    })

    .state('tab.contact-detail', {
        url: '/contact/:contactId',
        views: {
            'tab-contacts': {
                templateUrl: 'templates/contact-detail.html',
                controller: 'ContactDetailCtrl'
            }
        }
    })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/stats');

});

