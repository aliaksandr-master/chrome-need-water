"use strict";

module.exports = function (grunt, options) {

	this
		.uglify({
			files: [{
				expand: true,
				cwd: this.BUILD + '/scripts',
				src: '**/*.js',
				dest: this.BUILD + '/scripts/'
			}]
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
	;
};