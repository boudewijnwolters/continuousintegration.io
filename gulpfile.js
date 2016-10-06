var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),
	shell = require('gulp-shell'),
	autoprefixer = require('gulp-autoprefixer');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

	browserSync.init({
		server: {
			baseDir: '_site/'
		},
		browser: '',
		notify: false
	});

	gulp.watch('assets/scss/*.scss', ['sass']);
	gulp.watch('_site/**/*.html').on('change', browserSync.reload);
	gulp.watch('_site/**/*.css').on('change', browserSync.stream);
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
		.pipe(gulp.dest('assets/css'));
});

gulp.task('build', shell.task(['jekyll serve --watch --baseurl ""']));

gulp.task('html', function () {
	return gulp.src('*.html')
		.pipe(browserSync.stream());
});


gulp.task('default', ['build', 'serve']);