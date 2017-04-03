const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const livereload = require('gulp-livereload');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const notify = require('gulp-notify');
const gutil = require('gulp-util');
const ftp = require('vinyl-ftp');
const browserSync = require('browser-sync').create();

livereload({
  start: true
});

const sourceDir = '_src';
const distDir = '_dst';
const remoteDirLive = 'public_html'
const remoteDirDev = 'public_html/dev'

gulp.task('deploy-live', function() {
  var conn = ftp.create({
    host: 'domain', // ie google.com
    user: 'username',
    password: 'password',
    parallel: 3,
    log: gutil.log
  });
  /* list all files you wish to ftp in the glob variable */
  var globs = [
    distDir + '/**/*'
    //, '!node_modules/**' // if you wish to exclude directories, start the item with an !
  ];
  return gulp.src(globs, {
      base: './' + distDir + '/',
      buffer: false
    })
    .pipe(conn.newer('.')) // only upload newer files
    .pipe(conn.dest(remoteDirLive + '/'))
    .pipe(notify('Live Site Updated'));
});

gulp.task('deploy-dev', function() {
  var conn = ftp.create({
    host: 'maxselect.com',
    user: 'maxsel',
    password: 'maxPass2017!',
    parallel: 3,
    log: gutil.log
  });
  /* list all files you wish to ftp in the glob variable */
  var globs = [
    distDir + '/**/*'
    //, '!node_modules/**' // if you wish to exclude directories, start the item with an !
  ];
  return gulp.src(globs, {
      base: './' + distDir + '/',
      buffer: false
    })
    .pipe(conn.newer('.')) // only upload newer files
    .pipe(conn.dest(remoteDirDev + '/'))
    .pipe(notify('Dev Site Updated'));
});

// Task: Start Browsersync
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: './' + distDir
  });
  gulp.watch(sourceDir + '/scss/**/*.scss', ['sass']);
  gulp.watch(sourceDir + '/*.html').on('change', browserSync.reload);
});

// Task: JS Files
gulp.task('js', () => {
  return gulp.src(sourceDir + '/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(distDir + '/js'))
    .on('end', function() {
      gutil.log('//////// JS Complete ////////');
    });
});

// Task: JS Lint
gulp.task('lint', () => {
  return gulp.src([sourceDir + '**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('end', function() {
      gutil.log('//////// LINT Complete ////////');
    });
});

// Task: SASS Files
gulp.task('sass', function() {
  return gulp.src(sourceDir + '/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(distDir + '/css'))
    .pipe(livereload())
    .on('end', function() {
      gutil.log('//////// SASS Complete ////////');
    });
});

// Task: HTML Files
gulp.task('html', function() {
  return gulp.src(sourceDir + '/*.html')
    .pipe(gulp.dest(distDir))
    .pipe(livereload())
    .on('end', function() {
      gutil.log('//////// HTML Complete ////////');
    });
});

// Task: Watch
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(sourceDir + '/scss/**/*.scss', ['sass']);
  gulp.watch(sourceDir + '/js/**/*.js', ['js']);
  gulp.watch(sourceDir + '/*.html', ['html']);
});

// Task: Default
gulp.task('default', ['js', 'sass', 'html', 'watch', 'deploy-dev', 'serve']);
