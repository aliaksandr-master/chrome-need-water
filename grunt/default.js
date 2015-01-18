"use strict";

module.exports = function (grunt, options) {

	this.include([
		'install',
		'build'
	]);

	this.watch({
		files: [
			this.SRC + '/**/*',
			'!' + this.SRC + '/manifest.json'
		],
		tasks: [
			'install',
			'build'
		]
	})
};