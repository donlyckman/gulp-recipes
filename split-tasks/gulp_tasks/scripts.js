//console.log('*** Starting Scripts');

var config = require('../gulp_tasks/config.js');

module.exports = function(gulp, plugins) {
  return function() {
    gulp.src(config.paths.src + '/js/**/*.js')
      .pipe(plugins.concat('scripts.js'))
      .pipe(plugins.uglify())
      .pipe(gulp.dest(config.paths.dest + '/js/'));
  };
};
