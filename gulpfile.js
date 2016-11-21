var gulp         = require('gulp'),
    babel        = require('gulp-babel'),
    image        = require('gulp-image'),
    concat       = require('gulp-concat'),
    sass         = require('gulp-sass'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sync         = require('browser-sync').create();

var processors = [
  autoprefixer
];

gulp.task('scss', function() {
    return gulp.src('app/styles/main.scss')
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(gulp.dest('dist/styles'))
        .pipe(sync.stream());
});

gulp.task('scripts', () => {
    return gulp.src('app/scripts/**')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('images', function () {
    gulp.src('app/images/**/**')
        .pipe(image())
        .pipe(gulp.dest('medias/images/'));
});

gulp.task('sync', ['scss', 'images', 'scripts'], function() {

    sync.init({
        server: './'
    });

    gulp.watch("app/styles/**/*.scss", ['scss']);
    gulp.watch("app/scripts/**/*.js", ['scripts']);
});
