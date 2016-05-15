'use strict';

const gulp = require('gulp'),
  webpack = require('gulp-webpack'),
  stylus = require('gulp-stylus'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  minCSS = require('gulp-minify-css'),
  minHTML = require('gulp-minify-html'),
  swig = require('gulp-swig'),
  fake = a => {
    process.argv = ['', '', ...a];
  },
  dist = 'dist/';

let config = {
  output: {filename: 'app.js'},
  cache: false,
  module: {loaders: [
    {
      loader: 'babel',
      exclude: /(node_modules|dist)/,
      query: {presets: ['es2015'], plugins: ['transform-runtime']}
    }
  ]}
};

// Webpack
gulp.task('build:javascript', () =>
  gulp.src(['scripts/*.js'])
    .pipe(webpack(config))
    .pipe(gulp.dest(dist))
    .pipe(rename('app.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest(dist))
);

// Stylus
gulp.task('build:stylus', () =>
  gulp
    .src('styles/index.styl')
    .pipe(stylus())
    .pipe(rename('app.css'))
    .pipe(gulp.dest(dist))
);

// Swig
gulp.task('build:swig', () =>
  gulp.src('views/index.html')
    .pipe(swig({defaults: {cache: false}}))
    .pipe(rename('app.html'))
    .pipe(gulp.dest(dist))
);

// Minification
gulp.task('minify:javascript', ['build:javascript'], () =>
  gulp.src('dist/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
);

gulp.task('minify:css', ['build:stylus'], () =>
  gulp.src('dist/app.css')
    .pipe(minCSS())
    .pipe(gulp.dest('dist'))
);

gulp.task('minify:html', ['build:swig'], () =>
  gulp.src('dist/app.html')
    .pipe(minHTML())
    .pipe(gulp.dest('dist'))
);

// Build
gulp.task('build', [
  'build:swig',
  'build:stylus',
  'build:javascript'
]);

// Minify
gulp.task('minify', [
  'minify:javascript',
  'minify:css',
  'minify:html'
]);

// Alias for build & minify
gulp.task('default', ['build']);

// Watch
gulp.task('watch', ['build'], function() {
  gulp.watch('views/**', ['build:swig']);
  gulp.watch('styles/**', ['build:stylus']);
  gulp.watch('scripts/**', ['build:javascript']);

  // Create fake app-server:
  fake(['-c', 'fake-app.json']);
  require('app-server');
});
