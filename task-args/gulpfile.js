var gulp = require('gulp');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var stripDebug = require('gulp-strip-debug');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var src = '_src';
var dest = '_dest';

var isProduction = (argv.production === undefined) ? false : true;
// Useage: gulp --production

gulp.task('js', function() {
  return gulp.src(src + '/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(gulpif(isProduction, stripDebug()))
    .pipe(gulpif(isProduction, uglify()))
    .pipe(concat('main.min.js'))
    .pipe(gulpif(!isProduction, sourcemaps.write()))
    .pipe(gulp.dest(dest + '/js'));
});

gulp.task('default', ['js'], function() {
  gulp.watch(src + '/js/**/*.js', ['scripts']);
});
