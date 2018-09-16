module.exports = function (gulp, modules, dir) {
	return function() {
		gulp.src(dir.dist + '/*.html')
		.pipe(modules.htmlMinify({
			empty: true,
			quotes: true,
			conditionals: true
		}))
		.pipe(gulp.dest(dir.dist));

		return gulp.src(dir.dist + '/view/**/*.html')
			.pipe(modules.htmlMinify({
				empty: true,
				quotes: true,
				conditionals: true
			}))
			.pipe(gulp.dest(dir.dist + '/view'));
	};
};

