var gulp = require('gulp');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');

gulp.task('default',['build']);

gulp.task('lint', function() {
    return gulp.src('site/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('clean:dist',function(callback) {
    del(['dist/**'],callback);
})

// Concatenate & Minify JS
gulp.task('build:minify', function() {
    gulp.src('src/**/*.js')
        .pipe(concat('fcts_lib.js'))
        .pipe(concat('loghound.js'))
        .pipe(rename('loghound.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean:dist','build:minify'], function(){
    gulp.src('src/**/*.css')
        .pipe(concat('loghound.css'))
        .pipe(gulp.dest('dist'));
});