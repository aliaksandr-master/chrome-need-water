"use strict";

module.exports = function (grunt, options) {

	this
		.include([
			'install',
			'build',
			'build/minify',
		])

		.compress({
			options: {
				archive: function() {
					var manifest = grunt.file.readJSON(options.BUILD + '/manifest.json');
					return options.DEPLOY + '/need-water-extension-' + manifest.version + '.zip';
				}
			},
			files: [{
				expand: true,
				cwd: this.BUILD + '/',
				src: [
					'**'
				],
				dest: ''
			}]
		})
	;
};