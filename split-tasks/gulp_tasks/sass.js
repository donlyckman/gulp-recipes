//console.log('*** Starting sass');

var config = require('../gulp_tasks/config.js');

module.exports = function(gulp, plugins) {
  return function() {
    gulp.src(config.paths.src + '/sass/styles.scss')
      .pipe(plugins.sass())
      .pipe(plugins.autoprefixer())
      .pipe(plugins.minifyCss())
      .pipe(gulp.dest(config.paths.dest + '/css/'));
  };
};
