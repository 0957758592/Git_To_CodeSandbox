	"use strict";
	let json = document.querySelector('[title="package.json"]') !== null;
	
	chrome.runtime.sendMessage({'data': [window.location.pathname, json]}, null);
	document.addEventListener('DOMContentLoaded', function() {
			chrome.tabs.executeScript(null, {file: 'scr.js'});
	}, false);
