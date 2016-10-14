var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sync = require('browser-sync').create();

var processors = [
  autoprefixer
];

gulp.task('scss', function() {
    return gulp.src('app/styles/*.scss')
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(gulp.dest('dist/styles'))
        .pipe(sync.stream());
});

gulp.task('sync', ['scss'], function() {
    sync.init({
        server: './'
    })

    gulp.watch("app/styles/**/*.scss", ['scss']);
});

gulp.task('default', ['sync'], function() {
});
