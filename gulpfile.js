const gulp = require('gulp'),
      inject = require('gulp-inject'),
      browserSync = require('browser-sync').create(),
      wiredep = require('wiredep').stream,
      jshint = require('gulp-jshint'),
      naturalSort = require('gulp-natural-sort'),
      files = ['./src/css/*.css', './src/js/*.js', './src/js/**/*.js'];

gulp.task('lint', function() {
      gulp.src(['./src/js/*.js', './src/js/**/.js'])
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('jshint-stylish'), {
                  verbose: true
            });
})
gulp.task('inject', function() {
      const wiredepOptions = {
            'bowerJson': require('./bower.json'),
            'directory': './src/bower_components',
            'ignorePath': '../src'
      };
      const injectOptions = {
            ignorePath: "/src"
      };
      gulp.src('./src/index.html')
            .pipe(inject(gulp.src(files)
                        .pipe(naturalSort()), injectOptions))
            .pipe(wiredep(wiredepOptions))
            .pipe(gulp.dest('./src'));
})
gulp.task('browser-sync',function() {
      browserSync.init({
            server: {
                  baseDir: "./src"
            },
            port: process.env.PORT || 5000 
      })
})
gulp.task('serve', ['inject', 'lint', 'browser-sync'], function() {
      var files = ['./src/*.html','./src/css/*.css', './src/**/*.js', './src/*.js']
     // gulp.watch(files, ['inject' ])
      gulp.watch(files).on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync'])