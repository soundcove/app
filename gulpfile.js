'use strict';

const gulp = require('gulp'),
      webpack = require('gulp-webpack'),
      stylus = require('gulp-stylus'),
      rename = require('gulp-rename'),
      swig = require('gulp-swig'),
      fake = (a) => { process.argv = [ '', '', ...a]; },
      dist = 'dist/';

// Webpack
gulp.task('build:javascript', () =>
  gulp.src('scripts/*.js')
    .pipe(webpack({
      output:{ filename:'app.js' },
      module:{ loaders:[
        {
          loader:'babel', test:/\.jsx?$/,
          exclude:/(node_modules|bower_components|dist)/,
          query:{ presets:[ 'es2015' ], plugins:[ 'transform-runtime' ] }
        }
      ]}
    }))
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

// Alias for all
gulp.task('build', [ 'build:swig', 'build:stylus', 'build:javascript' ]);

// Set default to build all
gulp.task('default', [ 'build' ]);

// Watch
gulp.task('watch', [ 'default' ], function(){
  gulp.watch('views/**', [ 'build:swig' ]);
  gulp.watch('styles/**', [ 'build:stylus' ]);
  gulp.watch('scripts/**', [ 'build:javascript' ]);

  // Create fake app-server:
  fake(['-c', 'app.json', '--port=8080', '--serve.maxAge="0"']);
  require('app-server');
});
