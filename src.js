	"use strict";
	let newURL = '';
	let json = '';

	chrome.runtime.onMessage.addListener(function(urls) {
		if(urls.data){
			newURL = urls.data[0];
			json = urls.data[1];
		}
	});

	chrome.browserAction.onClicked.addListener(function(tab) {  
		json ? confirm("Would you like to execute this code?") ? window.open("" + `https://codesandbox.io/s/github${newURL}`) : false : alert("File 'package.json' is not exist at this page");
	});


