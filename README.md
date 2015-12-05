# App Client
SoundCove's application is single-paged.  It's orientated around dynamic HTML5 URLs (falling back on hash URLs), and uses WebSockets to fetch information from the API server asynchronously.

## Contributing
Assuming you've forked, cloned, and `cd`ed:

 1. `npm install` dependencies.  (this will automatically `bower install` too)
 2. Start the gulp watcher and [`app-server`](https://github.com/soundcove/app-server) with `npm test`. (or `gulp test`)
 3. Lint your code with [`jshint`](https://github.com/jshint/jshint).


### Notice
SoundCove encourages developers to help improve and experiment with our code, we hope people are inspired from our code.  However, it's against our terms to redistribute or use any of our code commercially.  Please see [soundcove/legal](https://github.com/soundcove/legal) for more information.  App Client (app-client) is copyright property of [SoundCove](https://github.com/soundcove/legal#us).
