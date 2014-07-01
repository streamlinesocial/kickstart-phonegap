Overview
========

This kickstart uses Grunt and Phonegap NPM packages to build an Ionic+AngularJS based app that compiles to iOS and Android. Before starting you'll want to be sure to have the platforms setup that you intend to compile. [See Cordovas reference](http://cordova.apache.org/docs/en/edge/guide_platforms_index.md.html#Platform%20Guides).


Getting Started
===============

### Init

    npm install -g grunt-cli phonegap
    npm install

### Updates

Update bower and index.html, regenerates icon, splash and sass in one call

    grunt build

Individual updates

    grunt bower
    grunt assets
    grunt sass

### Build

To build iOS or Andoroid

    grunt phonegap:build:ios
    grunt phonegap:build:android

### Release

Note: currently iOS release is not fully automated. You need to open
the project created in the dist/platforms/ios directory and manually
archive the app for releases.

Builds all platforms and create releases/android/appname-version.apk

    grunt shipit
