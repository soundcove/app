'use strict';

const gulp = require('gulp'),
      stylus = require('gulp-stylus'),
      swig = require('gulp-swig'),
      jshint = require('gulp-jshint'),
      stylish = require('jshint-stylish'),
      browserify = require('browserify'),
      source = require('vinyl-source-stream'),
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

// Browserify + Babel compiler
gulp.task('js', () => {

  browserify('scripts/app.js')
    .transform('babelify', { presets: ['es2015'] }).bundle()
    .pipe(source('dist/app.js'))
    .pipe(gulp.dest('scripts'));

});

gulp.task('lint', () => {

  gulp.src(['scripts/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));

});

// Compilation.
gulp.task('default', [ 'stylus', 'swig', 'js', 'lint' ]);


// Testing
gulp.task('test', function(){
  gulp.watch('views/**', [ 'swig' ]);
  gulp.watch(['styles/**', '!styles/index.css'], [ 'stylus' ]);
  gulp.watch(['scripts/**', '!scripts/dist/**'], [ 'js', 'lint' ]);

  simulateApp('-c', 'test_config.json');
});
