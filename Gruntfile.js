'use strict';

module.exports = require('grunto')(function (grunt) {

	this.context({
		CWD:    __dirname,
		SRC:    'app',
		DEPLOY: 'package',
		BUILD:  'dist'
	});

	this.scan([{
		cwd: 'grunt/',
		src: [
			'**/*.js',
			'!**/_*.js',
			'!**/_*/**/*.js'
		]
	}]);

	return {
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			}
		},

		autoprefixer: {
			options: {
				browsers: [ 'last 2 version' ],
				diff: false,
				map: false
			}
		}
	};
});
