var gulp = require('gulp');
var tsc = require('gulp-tsc');
var shell = require('gulp-shell');
var runseq = require('run-sequence');
var tslint = require('gulp-tslint');

var paths = {
  tscripts: {
    src: ['app/**/*.ts'],
    dest: 'build'
  }
};

gulp.task('default', ['lint', 'buildrun']);

// ** Running ** //

gulp.task('run', shell.task([
  'node build/index.js'
]));

gulp.task('buildrun', function (cb) {
  runseq('build', 'run', cb);
});

// ** Watching ** //

gulp.task('watch', function () {
  gulp.watch(paths.tscripts.src, ['compile:typescript']);
});

gulp.task('watchrun', function () {
  gulp.watch(paths.tscripts.src, runseq('compile:typescript', 'run'));
});

// ** Compilation ** //

gulp.task('build', ['compile:typescript']);
gulp.task('compile:typescript', function () {
  return gulp
    .src(paths.tscripts.src)
    .pipe(tsc({
      module: "commonjs",
      emitError: false
    }))
    .pipe(gulp.dest(paths.tscripts.dest));
});

gulp.task('cs', function () {
  return gulp
    .src(paths.tscripts.src)
    .pipe(tsc({
      target: 'ES5',
      module: 'commonjs'
    }))
    .pipe(gulp.dest(paths.tscripts.dest));
});

gulp.task('bundle:sys:builder', /* ['cs'], */ function () {
  var path = require("path");
  var Builder = require('systemjs-builder');

  // optional constructor options
  // sets the baseURL and loads the configuration file
  var builder = new Builder('build/', {
    defaultJSExtensions: true,
  });

  builder
    .bundle('index.js', 'bundle.js')
    .then(function () {
      console.log('Build complete');
    })
    .catch(function (err) {
      console.log('Build error');
      console.log(err);
    });
})

gulp.task('bundle:webpack', ['cs'], function () {
  var gulp = require('gulp');
  var webpack = require('webpack-stream');
  var named = require('vinyl-named');
  return gulp.src('build/pilot.js')
    .pipe(named())
    .pipe(webpack({
      output: {
        filename: 'app.js'
      }
    }))
    .pipe(gulp.dest('dist/'));
});

// ** Linting ** //

gulp.task('lint', ['lint:default']);
gulp.task('lint:default', function () {
  return gulp.src(paths.tscripts.src)
    .pipe(tslint())
    .pipe(tslint.report('prose', {
      emitError: false
    }));
});
