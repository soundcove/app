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
  gulp.src('source/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./'))
})

// Browserify
gulp.task('browserify', function() {
  browserify('./source/index.js').bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('./'))
})

// Watch
gulp.task('watch', ['build'], function() {
  gulp.watch('styles/**', ['build:sass']);
  gulp.watch('scripts/**', ['build:javascript']);

  // Create fake app-server:
  fake(['-c', 'fake-app.json']);
  require('app-server');
});
