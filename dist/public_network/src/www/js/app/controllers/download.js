(function(){
	'use strict';

	angular.module('app').controller('DownloadCtrl', DownloadCtrl);
	
	DownloadCtrl.$inject = ['$rootScope', '$scope', '$http'];
	
	function DownloadCtrl($rootScope, $scope, $http){
		$rootScope.downloadPage = true;
		
		function getVersion () {
			$http({
				method : 'GET',
				url    : '/version.json'
			})
			.then(function(response) {
				$scope.version = response.data;
			});
		}
		
		getVersion ();
		
		$scope.accordion = function($event) {
			var elem = $event.currentTarget.parentNode;
			var elems = $event.currentTarget.parentNode.parentNode.querySelectorAll(".accordion");
			
			if (document.querySelectorAll(".accordion.active").length === 1 && hasClass(elem, "active")) {
				return false;
			}
			
			if (hasClass(elem, "active")) {
				TweenMax.to(elem, 0.5, {className:"-=active"});
			} else {
				for (var i = 0; i < elems.length; i++) {
					TweenMax.to(elems[i], 0.5, {className:"-=active"});
				}
				TweenMax.to(elem, 0.5, {className:"+=active"});
			}
		};
		
		$scope.$on('$destroy', function() {
			$rootScope.downloadPage = false;
		});
	}
})();