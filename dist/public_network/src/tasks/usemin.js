module.exports = function (gulp, modules, dir) {
	return function() {
		return gulp.src(dir.folder + '/*.{php,html}')
		.pipe(modules.usemin({
			css: ['concat'],
			js: [modules.ngAnnotate(), modules.uglify()]
		}))
		.pipe(modules.uncache())
		.pipe(modules.replaceTask({
			patterns: [{
				match: /\"\/?js\//g,
				replacement: '"' + dir.replace + 'js/'
			},{
				match: /\"\/?css\//g,
				replacement: '"' + dir.replace + 'css/'
			},{
				match: /\"\/?images\//g,
				replacement: '"' + dir.replace + 'images/'
			},{
				match: /\"\/?favicon.ico/g,
				replacement: '"' + dir.replace + 'favicon.ico'
			}]
		}))
		.pipe(gulp.dest(dir.dist));
	};
};