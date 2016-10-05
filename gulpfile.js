var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

    browserSync.init({
        server: '.',
        browser: '',
        notify: false
    });

    gulp.watch('app/scss/*.scss', ['sass']);
    gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('sass', function () {
    return gulp.src('assets/scss/*.scss')
        .pipe(sass())
        .on('error', function (e) {
            console.log(e);
            this.emit('end');
        })
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch('assets/scss/**/*.scss', ['sass']);
    gulp.watch('index.html', ['html']);
});


gulp.task('default', ['watch', 'serve']);