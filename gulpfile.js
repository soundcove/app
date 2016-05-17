'use strict'

// Node Modules
var gulp       = require('gulp')
var browserify = require('browserify')
var source     = require('vinyl-source-stream')

// Gulp Plugins
var sass = require('gulp-sass')
var jade = require('gulp-jade')

// Sass
gulp.task('sass', function () {
  gulp.src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'))
})

// Jade
gulp.task('jade', function () {
  gulp.src('*.jade')
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest(''))
})

// Browserify
gulp.task('browserify', function() {
  browserify('./index.js').bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest(''))
})

// Build
gulp.task('build', ['sass', 'jade'])
// gulp.task('build', ['sass', 'jade', 'browserify'])

// Watch
gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', ['build'])
  gulp.watch('index.jade',     ['build'])
  // gulp.watch('index.js',       ['build'])
})
