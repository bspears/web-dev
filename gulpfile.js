'use strict';

var gulp = require('gulp');

//plug-ins
var jshint     = require('gulp-jshint');
var sass       = require('gulp-sass');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var es         = require('event-stream');

//lint task 
gulp.task('lint', function() {
    return gulp.src('dev/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('sass', function(){
  return gulp.src('dev/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/css/'))
});

gulp.task('browserify', function() {
    return browserify('./dev/js/main.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('main.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./public/js/'));
});

//watch
gulp.task('watch', function(){
  gulp.watch('dev/js/*.js', ['lint', 'browserify']);
  gulp.watch('./dev/sass/*/*.scss', ['sass']);
})

gulp.task('default', ['lint', 'sass', 'browserify', 'watch']);