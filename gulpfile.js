var gulp = require('gulp');
var projectFolder = '../../../portfolio_site/projects/pomodoro-timer';

gulp.task('copy', function() {
  return gulp.src('./build/**/*')
             .pipe(gulp.dest(projectFolder))
});
