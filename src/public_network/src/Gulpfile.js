var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var modules = require('gulp-load-plugins')({
	rename: {
		'gulp-minify-html': 'htmlMinify',
		'gulp-minify-css': 'cssMinify'
	}
});

modules.sass = require('gulp-sass');
modules.webserver = require('gulp-webserver');
modules.gcmq = require('gulp-group-css-media-queries');
modules.stripCssComments = require('gulp-strip-css-comments');
modules.rename = require('gulp-rename');
modules.uncache = require('gulp-uncache');
modules.cssAdjuster = require('gulp-css-url-adjuster');
modules.beep = require('beepbeep');

modules.swallowError = function(error) {
	modules.beep();
	console.log(error.toString());
	return this.emit('end');
};

var dir = new function(){
	this.root   = __dirname;
	this.base   = '.';
	this.folder = this.base   + '/www';
	this.dist   = '../';
	
	this.replace = '/';
	
	this.js     = this.folder + '/js';
	this.css    = this.folder + '/css';
	this.scss    = this.folder + '/sass';
	this.img    = this.folder + '/images';
	this.dist_css   = this.dist + '/css';
	this.dist_img   = this.dist + '/images';
	this.dist_js    = this.dist + '/js';
};


var getTask = function getTask(task){
	var task;
	
	task = require(__dirname + '/tasks/' + task);
	
	return task(gulp, modules, dir);
};

gulp.task('usemin', getTask('usemin'));
gulp.task('htmlmin', getTask('htmlmin'));
gulp.task('styles', getTask('styles'));
gulp.task('images', getTask('images'));
gulp.task('csso', getTask('csso'));
gulp.task('distcopy', getTask('distcopy'));

gulp.task('watch', function() {
	gulp.watch([dir.scss.slice(2) + '/*.{sass,scss}'], ['styles']);
	modules.livereload.listen();
	
	return gulp.watch([
		dir.folder.slice(2) + '/*.html',
		dir.js.slice(2) + '/*.js',
		dir.css.slice(2) + '/style.css',
		dir.img.slice(2) + '/**'
	])
	.on('change', modules.livereload.changed);

});

gulp.task('build', function() {
	modules.sequence = require('run-sequence');
	modules.sequence(
		'distcopy',
		'images',
		'styles',
		'usemin',
		'csso',
		'htmlmin'
	);
});

gulp.task('webserver', ['watch'], function() {
  gulp.src(dir.folder)
    .pipe(modules.webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('default', ['webserver']);