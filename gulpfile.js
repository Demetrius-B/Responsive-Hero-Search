const gulp = require("gulp")
const sass = require('gulp-ruby-sass')
const browserSync = require('browser-sync').create()

gulp.task('sass', function() {
  return sass('./stylesheets/*.sass')
      .on('error', sass.logError)
      .pipe(gulp.dest('./css'))
      .pipe(browserSync.reload({
        stream:true
      }))
})

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
})

gulp.task('watch', ['browser-sync', 'sass'], function() {
  gulp.watch('./stylesheets/*.sass', ['sass'])
})
