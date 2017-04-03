var gulp = require('gulp');
var stripDebug = require('gulp-strip-debug');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var src = '_src';
var dest = '_dest';

gulp.task('js', function() {
  return gulp.src(src + '/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest + '/js'));
});

gulp.task('default', ['js'], function() {
  gulp.watch(src + '/js/**/*.js', ['scripts']);
});
