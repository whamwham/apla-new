module.exports = function (gulp, modules, dir) {
	return function() {
		return gulp.src(dir.dist_css + '/**.css')
		.pipe(modules.stripCssComments({preserve: false}))
		.pipe(modules.gcmq())
		.pipe(modules.csso())
		.pipe(gulp.dest(dir.dist_css));
	};
};
