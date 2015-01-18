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

		.imagemin({
			files: [{
				expand: true,
				cwd: this.SRC + '/images',
				src: '**/*.{gif,jpeg,jpg,png}',
				dest: this.BUILD + '/images'
			}]
		})

		.svgmin({
			files: [{
				expand: true,
				cwd: this.SRC + '/images',
				src: '**/*.svg',
				dest: this.BUILD + '/images'
			}]
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

		.uglify({
			files: [{
				expand: true,
				cwd: this.BUILD + '/scripts',
				src: '**/*.js',
				dest: this.BUILD + '/scripts/'
			}]
		})

		.copy({
			files: [{
				expand: true,
				dot: true,
				cwd: this.SRC,
				dest: this.BUILD,
				src: [
					'*.{ico,txt,png}',
					'images/**/*.{webp,gif}',
					'styles/**/*.css',
					'fonts/**/*.{woff,otf,ttf,svg}',
					'_locales/**/*.json'
				]
			}]
		})

		.htmlmin({
			options: {
				// removeCommentsFromCDATA: true,
				// collapseWhitespace: true,
				// collapseBooleanAttributes: true,
				// removeAttributeQuotes: true,
				// removeRedundantAttributes: true,
				// useShortDoctype: true,
				// removeEmptyAttributes: true,
				// removeOptionalTags: true
			},
			files: [{
				expand: true,
				cwd: this.SRC,
				src: '*.html',
				dest: this.BUILD
			}]
		})

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