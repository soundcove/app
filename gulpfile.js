'use strict'

var gulp       = require('gulp')
var browserify = require('browserify')
var source     = require('vinyl-source-stream')

var sass       = require('gulp-sass')
var jade       = require('gulp-jade')
var postcss    = require('gulp-postcss')
var svgSymbols = require('gulp-svg-symbols')

var autoprefixer = require('autoprefixer')

gulp.task('css', function () {
  gulp.src('src/index.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss([ autoprefixer ]))
    .pipe(gulp.dest('tmp/'))
})

gulp.task('browserify', function() {
  browserify('src/index.js').bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('tmp/'))
})

gulp.task('svg', function () {
  gulp.src('src/**/*.svg')
    .pipe(svgSymbols())
    .pipe(gulp.dest('tmp/'))
})

gulp.task('jade', function () {
  gulp.src('src/index.jade')
    .pipe(jade())
    .pipe(gulp.dest(''))
})

gulp.task('watch', function () {
  gulp.watch('src/**/*', ['jade'])
  gulp.watch('src/**/*', ['css', 'browserify'])
  gulp.watch('tmp/**/*', ['jade'])
})
