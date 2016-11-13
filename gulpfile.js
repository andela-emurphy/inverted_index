const gulp = require('gulp'),
      inject = require('gulp-inject'),
      browserSync = require('browser-sync').create(),
      wiredep = require('wiredep').stream,
      jshint = require('gulp-jshint'),
      angularFilesort = require('gulp-angular-filesort'),
      naturalSort = require('gulp-natural-sort')

var files = ['./src/css/*.css', './src/js/*.js', './src/js/**/*.js', './src/*.js'] 

gulp.task('lint', function() {

      gulp.src(files)
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('jshint-stylish'), {
                  verbose: true
            })
})


gulp.task('inject', function() {
      var wiredepOptions = {
            'bowerJson': require('./bower.json'),
            'directory': './src/bower_components',
            'ignorePath': '../'    
      }
      var injectOptions = {
            ignorePath: "/src"
      }

      gulp.src('./src/index.html')
            .pipe(inject(gulp.src(files).pipe(naturalSort('desc')), injectOptions))
            .pipe(wiredep(wiredepOptions))
            .pipe(gulp.dest('./src'))
})
gulp.task('browser-sync',function() {
      browserSync.init({
            server: {
                  baseDir: "./src"
            }
      })
})

gulp.task('serve', ['inject', 'lint', 'browser-sync'], function() {
      var files = [['./src/css/*.css', './src/**/*.js', './src/*.js']]
      gulp.watch(files).on('change', browserSync.reload);
      gulp.watch(files, ['inject', 'lint' ])
});