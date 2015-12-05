'use strict';

const gulp = require('gulp'),
      stylus = require('gulp-stylus'),
      swig = require('gulp-swig'),
      babel = require('gulp-babel'),
      jshint = require('gulp-jshint'),
      stylish = require('jshint-stylish'),

simulateApp = function(){
  process.argv = process.argv.slice(0,2);
  process.argv.push(...arguments);
  require('app-server');
};

// Stylus compiler
gulp.task('stylus', () => {
  gulp.src('styles/index.styl')
      .pipe(stylus({ 'compress': true }))
      .pipe(gulp.dest('styles'));
});

// Swig compiler
gulp.task('swig', () => {
  gulp.src('views/index.html')
      .pipe(swig({defaults: { cache: false }}))
      .pipe(gulp.dest('.'));
});

// Babel compiler
gulp.task('js', () => {
  gulp.src(['scripts/lib/*.js', 'scripts/index.js'])
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(gulp.dest('scripts/dist'));
});

// Compilation.
gulp.task('default', [ 'stylus', 'swig', 'js' ]);


// Testing
gulp.task('test', function(){
  gulp.watch('views/**', [ 'swig' ]);
  gulp.watch(['styles/components/**', 'styles/index.styl', '!styles/index.css'], [ 'stylus' ]);
  gulp.watch(['scripts/components/**', '!scripts/index.js'], [ 'js' ]);

  simulateApp('-c', 'test_config.json');
});
