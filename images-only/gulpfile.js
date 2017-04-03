var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var imageminGuetzli = require('imagemin-guetzli');

var src = '_src';
var dest = '_dest';

gulp.task('images', function() {
  return gulp.src(src + '/images/**/*.{gif,jpg,png,svg}')
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [{
          removeViewBox: true
        }]
      })
      // ,
      // imageminGuetzli()
    ]))
    .pipe(gulp.dest(dest + '/images'))
});

gulp.task('default', ['images'], function() {
  gulp.watch(src + '/images/**/*.{gif,jpg,png,svg}', ['scripts']);
});
