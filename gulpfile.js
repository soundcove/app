'use strict';

const gulp = require('gulp'),
      stylus = require('gulp-stylus'),
      swig = require('gulp-swig'),
      babel = require('gulp-babel'),
      concat = require('gulp-concat');

// Stylus compiler
gulp.task('stylus', () => {
  gulp.src('styles/index.styl')
      .pipe(stylus())
      .pipe(gulp.dest('styles'));
});

// Swig compiler
gulp.task('swig', () => {
  gulp.src(['views/index.html', 'views/home.html'])
      .pipe(swig({defaults: { cache: false }}))
      .pipe(gulp.dest('.'));
});

// Babel compiler
gulp.task('babel', () => {
  gulp.src(['scripts/**', '!scripts/index.js'])
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('index.js'))
      .pipe(gulp.dest('scripts'));
});

// Compilation.
gulp.task('default', [ 'stylus', 'swig', 'babel' ]);


// Testing
gulp.task('test', function(){
  gulp.watch('views/**', [ 'swig' ]);
  gulp.watch(['styles/**', 'static/index.styl'], [ 'stylus' ]);
  gulp.watch('scripts/**', [ 'babel' ]);

  process.argv = process.argv.slice(0,2);
  process.argv.push('-c', 'test_config.json');
  require('app-server');
});
