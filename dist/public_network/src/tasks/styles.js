module.exports = function (gulp, modules, dir) {
	return function() {
		return gulp.src([
			dir.scss + '/style.{sass,scss}',
		])
		.pipe(modules.sass({
			outputStyle: 'expanded' //CSS output style (nested | expanded | compact | compressed)
		}))
		.pipe(modules.autoprefixer({
			browsers: ['last 2 versions', 'ie 11', 'Chrome 25']
		}))
		.on('error', modules.swallowError)
		.pipe(gulp.dest(dir.css));
	};
};


