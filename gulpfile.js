var gulp         = require('gulp'),
    babel        = require('gulp-babel'),
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

gulp.task('sync', ['scss', 'scripts'], function() {
    sync.init({
        server: './'
    });

    gulp.watch("app/styles/**/*.scss", ['scss']);
    gulp.watch("app/scripts/**/*.js", ['scripts']);
});

gulp.task('scripts', () => {
    return gulp.src(['app/scripts/modernizr-custom.js', 'app/scripts/polyfills.js', 'app/scripts/nav.js', 'app/scripts/animations.js', 'app/scripts/menu.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/scripts'));
});