# App
SoundCove's [app](https://github.com/soundcove/app) is a single-page application that's deployed with our single-page server, [app-server](https://github.com/soundcove/app-server).  It uses [Gulp](https://github.com/gulpjs/gulp) to build and minify the resources locally and in production.  It also uses Gulp to create watchers for development so the resources can auto-build as you develop, as well as creating a fake app-server to see the changes live.

## Contributing
Assuming you've forked, cloned, and `cd`ed:

 1. `npm install` to install dependencies.
 2. `npm test` to start the gulp watchers and fake `app-server`.

### Notice
SoundCove encourages developers to help improve and experiment with our code, we hope people are inspired from our code.  However, it's against our terms to redistribute or use any of our code commercially.  Please see [soundcove/legal](https://github.com/soundcove/legal) for more information.  App Client (app-client) is copyright property of [SoundCove](https://github.com/soundcove/legal#us).
