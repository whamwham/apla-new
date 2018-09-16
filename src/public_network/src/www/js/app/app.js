(function(){
	'use strict';
	
	angular.module('app', ['pascalprecht.translate', 'ui.router', 'ngMaterial', 'ngMessages', 'angular-loading-bar', 'ngSanitize', 'ngScrollReveal', 'ksSwiper', 'duScroll', 'ngCookies', 'ngScrollbars']);
	
	angular.module('app').run(function($rootScope, $window, $location, $http){
		if (localStorage.getItem("NG_TRANSLATE_LANG_KEY")) {
			$rootScope.lang = localStorage.getItem("NG_TRANSLATE_LANG_KEY");
		} else {
			$rootScope.lang = "en";
		}
		
		$rootScope.$on('$stateChangeSuccess', function () {
			$window.scrollTo(0, 0);
			
			if ($window.ga) {
				$window.ga('send', 'pageview', {page: $location.path()});
			}
        });
		
		$rootScope.OpenPlayer = function(id) {
			var video = document.createElement("div");
			var close = document.createElement("div");
			var link = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + id + '?rel=0&amp;controls=1&amp;showinfo=0&amp;autoplay=1" frameborder="0" allowfullscreen></iframe>';

			video.setAttribute("id", "video");
			video.innerHTML = link;
			close.setAttribute("data-player-close", true);
			close.innerHTML = '<span>&times;</span>';

			document.body.appendChild(video);
			video.appendChild(close);
			
			video.addEventListener('touchmove', function(e) {
				e.preventDefault();
			});
			
			close.addEventListener('click', function() {
				$rootScope.ClosePlayer();
				return false;
			});

			document.body.style.overflow = "hidden";
		};
		
		$rootScope.ClosePlayer = function() {
			var video = document.getElementById("video");
			video.parentNode.removeChild(video);
			document.body.style.overflow = "";
		};
		
		$rootScope.format = function (num, currency) {
			if(num) {
				return currency + "" + parseFloat(num).toFixed(0).replace(/./g, function(c, i, a) {
					return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? " " + c : c;
				});
			}
		};
		
		$rootScope.header = {
			origin: 'top',
			distance : '200px',
			delay: 200,
			scale: 1,
			opacity: 0,
			duration: 2000,
			viewFactor: 0.01,
			reset: false,
			sequence: {
				selector: '',
				interval: 300
			},
			afterReveal: function (domEl) {
				domEl.style = "";
			}
		};
		
		$rootScope.default = {
			origin: 'top',
			distance : '-100px',
			delay: 200,
			scale: 0.7,
			opacity: 0,
			duration: 2000,
			viewFactor: 0.2,
			reset: false,
			afterReveal: function (domEl) {
				domEl.style = "";
			}
		};
		
		$rootScope.sequence = {
			origin: 'top',
			distance : '-100px',
			delay: 200,
			scale: 0.7,
			opacity: 0,
			duration: 2000,
			viewFactor: 0.2,
			reset: false,
			sequence: {
				selector: '',
				interval: 300
			},
			afterReveal: function (domEl) {
				domEl.style = "";
				domEl.parentNode.style = "";
			}
		};
		
		function getSocial () {
			$http({
				method : 'GET',
				url    : '/social.json'
			})
			.then(function(response) {
				$rootScope.social = response.data;
			});
		}
		
		getSocial ();
	
		if (getMobileOperatingSystem() === "iOS") {
			$rootScope.isiOS = true;
		}
		if (getMobileOperatingSystem() === "Android") {
			$rootScope.isAndroid = true;
		}
	});
})();