(function(){
	'use strict';

	angular.module('app').controller('HeaderCtrl', HeaderCtrl);
	
	HeaderCtrl.$inject = ['$rootScope', '$scope', '$location', '$timeout'];
	
	function HeaderCtrl($rootScope, $scope, $location, $timeout){
		$rootScope.$on('$stateChangeStart', function () {
			$scope.isActive = false;
			$timeout(function(){
				var currentRoute = $location.url();
				if (currentRoute !== '/') {
					AddClass(document.querySelector(".navigation span"), 'active', false);
				}
			}, 1000);
        });
		
		$scope.navClass = function (page) {
			var currentRoute = $location.url().split('/');
			return page.replace(/[^A-Za-z_]/gm, "") === currentRoute[1] ? 'active' : '';
		};
		
		window.addEventListener("scroll", Header);
		window.addEventListener("resize", Header);
		
		function Header() {
			var w = window.innerWidth;
			var scroll = window.pageYOffset || document.documentElement.scrollTop;
			var header = document.querySelector("header");

			if (w < 768) {
				if (scroll > 40) {
					AddClass(header, 'fly', true);
				} else {
					AddClass(header, 'fly', false);
				}
			} else {
				if (scroll > 140) {
					AddClass(header, 'fly', true);
				} else {
					AddClass(header, 'fly', false);
				}
			}
		}
		
		$scope.goto = function(id){
			var elem = document.getElementById(id);
			
			if (elem) {
				TweenMax.to(window, 1, {scrollTo: elem});
			} else {
				$timeout(function(){
					elem = document.getElementById(id);
					TweenMax.to(window, 1, {scrollTo: elem});
				}, 2000);
			}
		};
		
		$scope.openLanguage = function($mdMenu, ev) {
			$mdMenu.open(ev);
		};
		
		/* Add mobile navigation event */
		var header = document.querySelector("header");
		function prevent(event) {
			event.preventDefault();
		}
		
		$scope.navigation = function() {
			var w = window.innerWidth;
			
			if (w < 1201) {
				$scope.isActive = !$scope.isActive;

				if ($scope.isActive) {
					header.addEventListener("touchmove", prevent);
				} else {
					header.removeEventListener("touchmove", prevent);
				}
			}
		};
	}
})();