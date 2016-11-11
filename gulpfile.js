const gulp = require('gulp'),
      inject = require('gulp-inject')
      browserSync = require('browser-sync').create()

var files = ['./src/css/*.css', './src/js/*.js', './src/*.js'] 

gulp.task('inject', function() {
      gulp.src('./src/index.html')
            // .pipe(wiredep()) 
            .pipe(inject(gulp.src(files), {
                  ignorePath: 'src',
                  addRootSlash: false
            }))
            .pipe(gulp.dest('./src'))
})

gulp.task('browser-sync',function() {
      browserSync.init({
            server: {
                  baseDir: "./src"
            }
      })
})

gulp.task('server', ['inject', 'browser-sync'], function() {
      gulp.watch(['./src/css/*.css', './src/js/*.js', './src/*.js', './src/index.html']).on('change', browserSync.reload);
});