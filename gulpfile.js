const gulp = require('gulp');
const inject = require('gulp-inject');
const browserSync = require('browser-sync').create();
const wiredep = require('wiredep').stream;
const jshint = require('gulp-jshint');
const naturalSort = require('gulp-natural-sort');
const files = ['./src/css/*.css', './src/js/*.js', './src/js/**/*.js'];

gulp.task('lint', () => {
      gulp.src(['./src/js/*.js', './src/js/**/.js'])
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('jshint-stylish'), {
                  verbose: true
            });
      });
gulp.task('inject', () => {
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
});
gulp.task('browser-sync', () => {
      browserSync.init({
            server: {
                  baseDir: "./src"
            },
            port: process.env.PORT || 5000
      });
});
gulp.task('serve', ['inject', 'lint', 'browser-sync'], () => {
      var files = ['./src/**/*.html', './src/*.htm', './src/css/*.css',
            './src/**/*.js', './src/*.js'
      ];
      gulp.watch(files).on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync']);