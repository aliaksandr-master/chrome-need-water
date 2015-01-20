'use strict';

var port = chrome.extension.connect();

var GOAL = 3000;

var drink = {
	water: { title: 'Water', factor: 1 },
	coffee: { title: 'Coffee', factor: 1 },
	tea: { title: 'Tea', factor: 1 },
	milk: { title: 'Milk', factor: 0.23 },
	juice: { title: 'Juice', factor: 0.3 },
	energy: { title: 'Energy', factor: 0.3 },
	soda: { title: 'Soda', factor: 0.78 },
	other: { title: 'Other', factor: 0.5 }
};

(function (_, $, moment) {
	var today = moment().format('YYYYMMDD');
	var todayCellName = 'day-' + today;

	var udpdateStatCounter = function (f) {
		chrome.storage.sync.get(todayCellName, function (object) {
			if (_.isEmpty(object[todayCellName])) {
				object[todayCellName] = {
					goal: GOAL,
					today: today,
					liquids: []
				};
			}

			object = object[todayCellName];

			var value = _.reduce(object.liquids, function (result, liquid) {
				result += liquid.value;
				return result;
			}, 0);

			var percent = value * 100 / object.goal;

			percent = percent.toFixed(0);

			$('#liqudPopupStatToday').text(percent);

			chrome.browserAction.setBadgeText({ text: percent });

			var $body = $('#modalStatBody');
			$('#modalStatTitle').html(moment().format('MMMM Do YYYY'));
			_.each(object.liquids, function (liquid) {
				$body.append(
					'<tr>' +
						'<td>' + moment(liquid.date).format('hh:mm:ss') + '</td>' +
						'<td>' + drink[liquid.type].title + '</td>' +
						'<td>' + liquid.volume + 'ml</td>' +
						'<td>' + liquid.value + '</td>' +
					'</tr>'
				);
			});

			f && f();
		});
	};

	udpdateStatCounter();

	$('#liqudPopupCancel').on('click', function () {
		window.close();
	});

	$('#liqudPopupSave').on('click', function (e) {
		var liquidType = $('#liqudPopup [name="drink"]:checked').val();
		var volume =  +$('#liqudPopup [name="glass"]:checked').val();

		chrome.storage.sync.get(todayCellName, function (object) {
			if (_.isEmpty(object)) {
				object = {};
				object[todayCellName] = {
					goal: GOAL,
					today: today,
					liquids: []
				};
			}

			object[todayCellName].liquids.push({
				date: Date.now(),
				value: volume * drink[liquidType].factor,
				volume: volume,
				type: liquidType
			});

			chrome.storage.sync.set(object, function (items) {
				udpdateStatCounter(function () {
					window.close();
				});
			});
		});

		return false;
	});

})(window._, window.jQuery, window.moment);