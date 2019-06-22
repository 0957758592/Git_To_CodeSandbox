	"use strict";
	const GIT = "https://github.com/"

	chrome.tabs.onUpdated.addListener(
	  function(tabId, changeInfo, tab) {
	    if (changeInfo.url) {
	    	useListener(tabId);
	    }
	  }
	);

	chrome.tabs.onActivated.addListener(function(activeInfo) {
		useListener(activeInfo.tabId);
	}); 

	chrome.browserAction.onClicked.addListener(function(tabs) {  
		chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
		chrome.tabs.executeScript(tabs[0].id, {code: "var json = document.querySelector('[title=\"package.json\"]') !== null; json"}, function(res){
				res[0] ? 
				confirm("Would you like to execute this code?") ? 
					window.open("" + `https://codesandbox.io/s/github/${tabs[0].url.replace(GIT, "")}`) : 
					false : 
				alert("File 'package.json' is not exist at this page");
			});
		});
	});

	function getStatus(status) {
		chrome.browserAction.setBadgeText({text: status ? "on" : "off"}, null);
		chrome.browserAction.setBadgeBackgroundColor({color: status ? [0, 180, 0, 100] : [180, 0, 0, 100]}, null);
	}

	function useListener(tabId) {
		chrome.tabs.get(tabId, function(tab){
	  		tab.url.includes(GIT) ? 
	  			chrome.browserAction.enable(tab.id, getStatus(true)) : 
	  			chrome.browserAction.disable(tab.id, getStatus(false));
	  	});
	}