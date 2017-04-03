var gulp = require('gulp');
var babel = require('gulp-babel');
var stripDebug = require('gulp-strip-debug');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var pump = require('pump');

var src = '_src';
var dest = '_dest';

gulp.task('js', function(cb) {
  pump([
      gulp.src(src + '/js/**/*.js'),
      sourcemaps.init(),
      babel({
        presets: ['es2015']
      }),
      stripDebug(),
      uglify(),
      concat('main.min.js'),
      sourcemaps.write(),
      gulp.dest(dest + '/js')
    ],
    cb
  );
});

gulp.task('default', ['js'], function() {
  gulp.watch(src + '/js/**/*.js', ['scripts']);
});
