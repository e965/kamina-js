'use strict'

let
	gulp =      require('gulp'),
	rename =    require('gulp-rename'),
	plumber =   require('gulp-plumber'),
	minifyJS =  require('gulp-babel-minify')

let paths = {
	dev: ['dist/**/*.js', '!dist/**/*.min.js'],
	prod: 'dist/'
}

gulp.task('default', () => gulp.src(paths.dev)
	.pipe(plumber())
	.pipe(minifyJS())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(paths.prod))
)
