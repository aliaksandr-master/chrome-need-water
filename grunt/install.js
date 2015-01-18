"use strict";

module.exports = function (grunt, options) {

	this.bower({
		options: {
			copy: false,
			install: true,
			verbose: true,
			cleanTargetDir: false,
			cleanBowerDir: false,
			bowerOptions: {}
		}
	})

};