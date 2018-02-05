// jshint ignore: start
"use strict";

var gulp = require('gulp'),
		rename = require('gulp-rename'),
		sass = require('gulp-sass'),
		maps = require('gulp-sourcemaps'),
		cleanCss = require('gulp-cleancss'),
		del = require('del');


// STYLING
// Compile SASS files
gulp.task('compile', function(){
	return gulp.src('src/campfire.scss')
	.pipe(maps.init())
	.pipe(sass())
	.pipe(maps.write('./'))
	.pipe(gulp.dest('dist'));
});

// Minify the compiled CSS file created in the task above!
gulp.task('minify', ['compile'], function(){
	return gulp.src('dist/campfire.css')
	.pipe(cleanCss({compatibility: 'ie8'}))
	.pipe(rename('campfire.min.css'))
	.pipe(gulp.dest('dist'));
});



// Watched Files
gulp.task('watchFiles', function(){
	gulp.watch(['src/*.scss', 'src/**/*.scss'], ['minify']);
})


// Defined tasks
// 1. use 'gulp clean' before building the live theme
gulp.task('clean', function(){
	del('dist',{force: true},{read: false});
});

// 2. use 'gulp build' to compile the whole website into an uploadable directory
gulp.task('build', ['clean', 'minify']);


// use 'gulp serve' to watch any js or sass changes
gulp.task('serve', ['watchFiles']);

// use 'gulp' to basically build the whole app but also clean the dir
gulp.task('default', ['clean'], function(){
	gulp.start('build');
});
