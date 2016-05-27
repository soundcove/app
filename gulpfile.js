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
  gulp.src('source/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(''))
})

gulp.task('sass:pretty', function () {
  gulp.src('source/index.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest(''))
})

// Jade
gulp.task('jade', function () {
  gulp.src('source/index.jade')
    .pipe(jade())
    .pipe(gulp.dest(''))
})

gulp.task('jade:pretty', function () {
  gulp.src('source/index.jade')
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest(''))
})

// Browserify
gulp.task('browserify', function() {
  browserify('./source/index.js').bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('./'))
})

// Build
gulp.task('build',        ['sass',        'jade',        'browserify'])
gulp.task('build:pretty', ['sass:pretty', 'jade:pretty', 'browserify'])

// Watch
gulp.task('watch', function () {
  gulp.watch('source/**/*', ['build'])
})

gulp.task('watch:pretty', function () {
  gulp.watch('source/**/*', ['build:pretty'])
})
