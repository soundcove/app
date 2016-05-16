'use strict'

// Node Modules
var gulp       = require('gulp')
var browserify = require('browserify')
var source     = require('vinyl-source-stream')

// Gulp plugins
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')

// Sass
gulp.task('sass', function () {
  gulp.src('styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(''))
})

// Browserify
gulp.task('browserify', function() {
  browserify('./index.js').bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest(''))
})

// Watch
gulp.task('watch', function() {
  gulp.watch('styles/**', ['sass']);
  gulp.watch('scripts/**', ['browserify']);

  // Create fake app-server:
  fake(['-c', 'fake-app.json']);
  require('app-server');
});
