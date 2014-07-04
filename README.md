Overview
========

This kickstart uses Grunt and Phonegap NPM packages to build an Ionic+AngularJS based app that compiles to iOS and Android. Before starting you'll want to be sure to have the platforms setup that you intend to compile. [See Cordovas reference](http://cordova.apache.org/docs/en/edge/guide_platforms_index.md.html#Platform%20Guides).


Getting Started
===============

### Deps

**Grunt & Phonegap**

These want to be globally installed

    npm install -g grunt-cli phonegap

**GraphicsMagick**

Required for png / svg image functions

    # mac
    brew install graphicsmagick

    # ubuntu:
    sudo apt-get install graphicsmagick

### Init

    npm install

### Updates

Update bower and index.html, regenerates icon, splash and sass in one call

    grunt prepare

Individual updates

    grunt bower
    grunt assets
    grunt sass

### Build

To build iOS or Andoroid

    grunt build:ios
    grunt build:android

### Release

Note: currently iOS release is not fully automated. You need to open
the project created in the dist/platforms/ios directory and manually
archive the app for releases.

Builds all platforms and create releases/android/appname-version.apk

    grunt shipit

**Release iOS**

After running ```grunt shipit```

- open ```build/platforms/ios/AppName.xcodeproj```
- ensure iOS Device is selected in the device compile options
- ensure orientation settings are selected
- select Product > Archive to build for release
- Use the Archive window to export for AdHoc or AppStore

---

@TODO

- dynamicly generate ```.cordova/config.json``` with grunt
- remove ```.cordova/config.json``` from repo
- script the generation of the signed IPA file if possible for ```grunt shipit```
