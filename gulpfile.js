'use strict'

var gulp       = require('gulp')
var browserify = require('browserify')
var source     = require('vinyl-source-stream')

var sass = require('gulp-sass')
var jade = require('gulp-jade')

gulp.task('sass', function () {
  gulp.src('source/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('tmp/'))
})

gulp.task('browserify', function() {
  browserify('./source/index.js').bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('./tmp/'))
})

gulp.task('jade', ['sass', 'browserify'], function () {
  gulp.src('source/index.jade')
    .pipe(jade())
    .pipe(gulp.dest(''))
})

gulp.task('build', ['jade'])

gulp.task('watch', function () {
  gulp.watch('source/**/*', ['build'])
})
