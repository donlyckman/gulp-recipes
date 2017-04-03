var gulp = require('gulp');
var concat = require('gulp-concat');
var include = require('gulp-include');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

var src = '_src';
var dest = '_dest';

gulp.task('sass', function() {
  return gulp.src(src + '/scss/**/*.scss')
    .pipe(sass()) // gulp-sass
    .pipe(sourcemaps.init())
    .pipe(autoprefixer('last 2 version')) // gulp-autoprefixer
    .pipe(cssnano()) // cssnano
    .pipe(rename({ // add min to file name
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.')) // gulp-sourcemaps
    .pipe(gulp.dest(dest + '/css')) // write files
});

gulp.task('default', ['sass'], function() {
  gulp.watch(src + '/scss/**/*.{sass,scss}', ['sass']);
});
