'use strict'

let
	gulp =      require('gulp'),
	rename =    require('gulp-rename'),
	plumber =   require('gulp-plumber'),
	composer =  require('gulp-uglify/composer'),
	uglifyjs =  require('uglify-es')

let minify = composer(uglifyjs, console)

let paths = {
	dev: ['dist/**/*.js', '!dist/**/*.min.js'],
	prod: 'dist/'
}

gulp.task('default', () => gulp.src(paths.dev)
	.pipe(plumber())
	.pipe(minify({}))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(paths.prod))
)
