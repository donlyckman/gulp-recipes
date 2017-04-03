var gulp = require('gulp');
var sass = require('sass');
var plugins = require('gulp-load-plugins')();
var config = require('./gulp_tasks/config.js');

function getTask(task) {
  return require('./gulp_tasks/' + task + '.js')(gulp, plugins);
}

gulp.task('scripts', getTask('scripts'));
gulp.task('sass', getTask('sass'));

gulp.task('default', ['scripts', 'sass'], function() {
  gulp.watch(config.paths.src + '/js/**/*.js', ['scripts']);
  gulp.watch(config.paths.src + '/sass/**/*.{sass,scss}', ['sass']);
});
