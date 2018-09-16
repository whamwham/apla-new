/* Detect user OS */
function getMobileOperatingSystem() {
	'use strict';
	
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;

	if (/windows/i.test(userAgent)) {
		return "Windows";
	}

	if (/windows phone/i.test(userAgent)) {
		return "Windows Phone";
	}

	if (/linux|android/i.test(userAgent)) {
		return "Android";
	}

	if (/Mac|iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		return "iOS";
	}

	return "unknown";
}

/* Detect browser */
function getBrowser() {
	'use strict';
	
	// Opera 8.0+
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]" 
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;

    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;
	
	if (isOpera) {
		return "Opera";
	}

	if (isFirefox) {
		return "Firefox";
	}

	if (isSafari) {
		return "Safari";
	}

	if (isIE) {
		return "IE";
	}

	if (isEdge) {
		return "Edge";
	}

	if (isChrome) {
		return "Chrome";
	}

	if (isBlink) {
		return "Blink";
	}
}

function AddClass(element, cls, type){
	'use strict';

	var list = element.className.split(" ");
	
	if (list.indexOf(cls) !== -1){
		if (!type) delete list[list.indexOf(cls)];
	} else {
		if (type) list[list.length] = cls;
	}
	element.className = list.join(" ");
}

function hasClass(element, className) {
	'use strict';
	
	return element.className && new RegExp("(\\s|^)" + className + "(\\s|$)").test(element.className);
}

function offset(element) {
	var rect = element.getBoundingClientRect(),
	scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}