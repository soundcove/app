'use strict';

const gulp = require('gulp'),
      gutil = require('gulp-util'),
      webpack = require('webpack'),
      stylus = require('gulp-stylus'),
      swig = require('gulp-swig'),
      fake = (a) => { process.argv = [ '', '', ...a]; };

// CoffeeScript
gulp.task('javascript', (callback) => {
  webpack({
    context: __dirname,
    entry: __dirname + '/scripts',
    output: {
      path: __dirname + '/dist',
      filename: 'app.js'
    }
  }, function(err, stats) {
      if (err) throw new gutil.PluginError('webpack', err);
      gutil.log('[webpack]', stats.toString());
      callback();
  });
});

// Stylus
gulp.task('stylus', () =>
  gulp
    .src('styles/index.styl')
    .pipe(stylus())
    .pipe(gulp.dest('dist'))
);

// Swig
gulp.task('swig', () =>
  gulp.src('views/index.html')
    .pipe(swig({ defaults:{ cache:false } }))
    .pipe(gulp.dest('dist'))
);


// Set default to build all
gulp.task('default', [ 'javascript', 'stylus', 'swig' ]);

// Watch
gulp.task('watch', [ 'default' ], function(){
  gulp.watch('views/**', [ 'swig' ]);
  gulp.watch('scripts/src/*.js', [ 'javascript' ]);
  gulp.watch(['styles/index.styl', 'styles/components/**'], [ 'stylus' ]);

  // Create fake app-server:
  fake(['-c', '.test-config.json']);
  require('app-server');
});
