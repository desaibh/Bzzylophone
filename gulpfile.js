const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('es6', function () {
  return gulp.src('xylophone.js')
       .pipe(babel())
       .pipe(gulp.dest('dist'));
});

gulp.task('default', function () {
  gulp.watch('xylophone.js',['es6']);
});
