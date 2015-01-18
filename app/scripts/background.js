'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
	chrome.storage.sync.clear();
  //console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({ text: '0' });

chrome.extension.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(msg) {
	});
});

