'use strict';

(function ($) {

	$('#liquidForm').on('submit', function (e) {
		var array = $(this).serializeArray();

		alert(JSON.stringify(array));

		return false;
	});

})(window.jQuery);