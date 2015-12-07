'use strict';

const gulp = require('gulp'),
      webpack = require('gulp-webpack'),
      stylus = require('gulp-stylus'),
      rename = require('gulp-rename'),
      uglify = require('gulp-uglify'),
      minCSS = require('gulp-minify-css'),
      minHTML = require('gulp-minify-html'),
      swig = require('gulp-swig'),
      fake = (a) => { process.argv = [ '', '', ...a]; },
      dist = 'dist/';

let config = {
  output:{ filename:'app.js' },
  cache:false,
  module:{ loaders:[
    {
      loader:'babel', test:/\.jsx?$/,
      exclude:/(node_modules|dist)/,
      query:{ presets:[ 'es2015' ], plugins:[ 'transform-runtime' ] }
    }
  ]}
};

// Webpack
gulp.task('build:javascript', () =>
  gulp.src(['scripts/*.js'])
    .pipe(webpack(config))
    .pipe(gulp.dest(dist))
    .pipe(rename('app.min.js'))
    .pipe(uglify({ mangle: false }))
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
    .pipe(swig({ defaults:{ cache:false } }))
    .pipe(rename('app.html'))
    .pipe(gulp.dest(dist))
);

// Minification
gulp.task('minify:javascript', [ 'build:javascript' ], () =>
  gulp.src('dist/app.js')
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
);

gulp.task('minify:css', [ 'build:stylus' ], () =>
  gulp.src('dist/app.css')
    .pipe(rename('app.min.css'))
    .pipe(minCSS())
    .pipe(gulp.dest('dist'))
);

gulp.task('minify:html', [ 'build:swig' ], () =>
  gulp.src('dist/app.html')
    .pipe(rename('app.min.html'))
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
  'build',
  'minify:javascript',
  'minify:css',
  'minify:html'
]);

// Alias for build & minify
gulp.task('default', [ 'minify' ]);

// Watch
gulp.task('watch', [ 'minify' ], function(){
  gulp.watch('views/**', [ 'build:swig', 'minify:html' ]);
  gulp.watch('styles/**', [ 'build:stylus', 'minify:css' ]);
  gulp.watch('scripts/**', [ 'build:javascript', 'minify:javascript' ]);

  // Create fake app-server:
  fake([ '-c', 'app.json', '--port=8080', '--serve.maxAge="0"' ]);
  require('app-server');
});
