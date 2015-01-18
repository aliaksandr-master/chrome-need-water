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

		.concat({
			options: {
				stripBanners: true
			},
			files: [{
				src: [
					this.SRC + '/bower_components/jquery/dist/jquery.min.js',
					this.SRC + '/bower_components/lodash/dist/lodash.min.js',
					this.SRC + '/bower_components/moment/min/moment.min.js',
					this.SRC + '/bower_components/bootstrap-less/js/transition.js',
					this.SRC + '/bower_components/bootstrap-less/js/alert.js',
					this.SRC + '/bower_components/bootstrap-less/js/button.js',
					this.SRC + '/bower_components/bootstrap-less/js/carousel.js',
					this.SRC + '/bower_components/bootstrap-less/js/collapse.js',
					this.SRC + '/bower_components/bootstrap-less/js/dropdown.js',
					this.SRC + '/bower_components/bootstrap-less/js/modal.js',
					this.SRC + '/bower_components/bootstrap-less/js/tooltip.js',
					this.SRC + '/bower_components/bootstrap-less/js/popover.js',
					this.SRC + '/bower_components/bootstrap-less/js/scrollspy.js',
					this.SRC + '/bower_components/bootstrap-less/js/tab.js',
					this.SRC + '/bower_components/bootstrap-less/js/affix.js',
					this.SRC + '/scripts/vendor.js'
				],
				dest: this.BUILD + '/scripts/vendor.js'
			}]
		})
	;

};