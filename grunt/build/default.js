"use strict";

var path = require('path');

module.exports = function (grunt, options) {

	this
		.jshint([
			'Gruntfile.js',
			this.SRC + '/scripts/**/*.js'
		])

		.clean([
			this.BUILD
		])

		.chromeManifest({
			options: {
				buildnumber: true,
				background: {
					target: 'scripts/background.js',
					exclude: [
						'scripts/chromereload.js'
					]
				}
			},
			src: this.SRC,
			dest: this.BUILD
		})

		.less({
			options: {},
			files: [{
				expand: true,
				cwd: this.SRC + '/styles',
				src: [
					'**/*.less',
					'!_*/**/*.less'
				],
				ext: '.css',
				dest: this.BUILD + '/styles'
			}]
		})

		.autoprefixer({
			options: {},
			files: [{
				expand: true,
				cwd: this.BUILD,
				dest: this.BUILD,
				src: [
					'**/*.css'
				]
			}]
		})

		//.concat({
		//	files: [{
		//		src: [],
		//		dest: ''
		//	}]
		//})

		.copy({
			files: [
				{
					expand: true,
					cwd: this.SRC + '/bower_components',
					dest: this.BUILD + '/fonts',
					src: [
						'**/fonts/*.{woff,eot,otf,ttf,svg}'
					],
					rename: function (cwd, file) {
						return path.join(cwd, file.replace('/fonts', ''));
					}
				},
				{
					expand: true,
					cwd: this.SRC,
					dest: this.BUILD,
					src: [
						'*.{ico,txt,png,html}',
						'images/**.{gif,jpeg,jpg,png,webp,gif}',
						'styles/**/*.css',
						'scripts/**/*.js',
						'fonts/**/*.{woff,eot,otf,ttf,svg}',
						'_locales/**/*.json'
					]
				}
			]
		})
	;

};