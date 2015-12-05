'use strict';

let v = process.argv;

const gulp = require('gulp'),
      gutil = require('gulp-util'),
      stylus = require('gulp-stylus'),
      swig = require('gulp-swig'),
      coffee = require('gulp-coffee'),
      fake = (a) => { process.argv = [ '', '', ...a]; }

// CoffeeScript
gulp.task('coffee', () =>
  gulp
    .src('scripts/src/*.coffee')
    .pipe(coffee({ bare: true })
    .on('error', gutil.log))
    .pipe(gulp.dest('scripts'))
);

// Stylus
gulp.task('stylus', () =>
  gulp
    .src('styles/index.styl')
    .pipe(stylus())

    .pipe(gulp.dest('styles'))
);

// Swig
gulp.task('swig', () =>
  gulp.src('views/index.html')
    .pipe(swig({ defaults:{ cache:false } }))
    .pipe(gulp.dest('.'))
);


// Set default to build all
gulp.task('default', [ 'coffee', 'stylus', 'swig' ]);

// Watch
gulp.task('watch', [ 'default' ], function(){
  gulp.watch('views/**', [ 'swig' ]);
  gulp.watch('scripts/src/*.coffee', [ 'coffee' ]);
  gulp.watch(['styles/index.styl', 'styles/components/**'], [ 'stylus' ]);

  // Create fake app-server:
  fake(['-c', '.test-config.json'])
  require('app-server');
});
