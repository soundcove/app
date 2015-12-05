'use strict';

const gulp = require('gulp'),
      stylus = require('gulp-stylus'),
      swig = require('gulp-swig'),
      babel = require('gulp-babel'),
      concat = require('gulp-concat'),
      jshint = require('gulp-jshint'),
      stylish = require('jshint-stylish'),
      uglify = require('gulp-uglify'),

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
gulp.task('babel', () => {
  gulp.src(['scripts/**', '!scripts/soundcove.js'])
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('soundcove.js'))
      .pipe(uglify())
      .pipe(gulp.dest('scripts'));
});

// JSHint linter
gulp.task('lint', () => {

});

// Compilation.
gulp.task('default', [ 'stylus', 'swig', 'babel' ]);


// Testing
gulp.task('test', function(){
  gulp.start('stylus', 'swig', 'babel');
  gulp.watch('views/**', [ 'swig' ]);
  gulp.watch(['styles/components/**', 'styles/index.styl', '!styles/index.css'], [ 'stylus' ]);
  gulp.watch(['scripts/components/**', '!scripts/index.js'], [ 'babel' ]);

  simulateApp('-c', 'test_config.json');
});
