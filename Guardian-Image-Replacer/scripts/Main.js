"use strict";

var url = "";

function replace() {
	var images = document.getElementsByTagName("img");
	for (var i = 0; i < images.length; i++) {
		images[i].src = url;}
}

chrome.storage.sync.get({
	enabled: false,
	backgroundimgs: false,
	url: ""
}, function(items) {
	if (items.enabled) {
		url = items.url;
		var css = document.createElement("style");
		css.innerHTML = "img { content: url(\"" + url + "\") !important; }";
		document.body.appendChild(css);
		window.setInterval(replace, 3000);
		replace();
	}
});

// My additions
let remove = () => {
	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++) {
		if (divs[i].style.backgroundImage != "none") {
			divs[i].style.backgroundImage = `url(${url})`;
		}
	}
}

chrome.storage.sync.get(["backgroundimgs"], function (result) {
	url = result.url;
	if (result.backgroundimgs == true) {
		window.setInterval(remove, 3000);
		remove();
}})