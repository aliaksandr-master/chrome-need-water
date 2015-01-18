"use strict";

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
			files: [{
				expand: true,
				dot: true,
				cwd: this.SRC,
				dest: this.BUILD,
				src: [
					'*.{ico,txt,png,html}',
					'images/**.{gif,jpeg,jpg,png,webp,gif}',
					'styles/**/*.css',
					'scripts/**/*.js',
					'fonts/**/*.{woff,otf,ttf,svg}',
					'_locales/**/*.json'
				]
			}]
		})
	;

};