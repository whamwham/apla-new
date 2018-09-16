module.exports = function (gulp, modules, dir) {
	return function() {
		return gulp.src([
				dir.img + '/**',
			], {
				base: dir.folder
			})
			.pipe(modules.imagemin({
				progressive: true,
				optimizationLevel: 7,
				svgoPlugins: [{
					removeViewBox: false
				}]
			}))
			.pipe(gulp.dest(dir.dist));
	};
};


