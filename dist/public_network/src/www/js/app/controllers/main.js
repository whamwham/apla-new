(function(){
	'use strict';

	angular.module('app').controller('MainCtrl', MainCtrl);
	
	MainCtrl.$inject = ['$rootScope', '$scope', '$http', '$mdDialog', '$timeout'];
	
	function MainCtrl($rootScope, $scope, $http, $mdDialog, $timeout){
		$rootScope.$watch('lang', function() {
			getTeam($rootScope.lang);
		});
		
		getBlog();
		
		function getTeam(id) {
			$http({
				method: 'GET',
				url: 	'/locale/' + id + '.json'
			})
			.then(function(response) {
				$scope.team = response.data.MAIN.TEAM;
			}, function(error) {
				console.log(error);
			});
		}
		
		function getBlog() {
			$http({
				method: 'GET',
				url: 	'/data/blog.json'
			})
			.then(function(response) {
				$scope.news = response.data;
			}, function(error) {
				console.log(error);
			});
		}
		
		$scope.Send = function() {
			$scope.dataLoading = true;

			$http({
				method: 'POST',
				url: 	'https://apla.io/subscribe',
				data:	{
					email: $scope.email
				}
			})
			.then(function(response) {
				if (response.data === "OK") {
					$scope.ready = true;
				} else if (response.data === "DUP") {
					$scope.dublicate = true;
				}
				$scope.dataLoading = false;
			}, function(error) {
				console.log(error);
				$scope.dataLoading = false;
			});
		};
		
		$scope.showEcosystem = function(ev) {
			$mdDialog.show({
				controller: function DialogController($scope, $mdDialog) {
					$scope.cancel = function() {
						$mdDialog.cancel();
					};
				},
				templateUrl: '/view/ecosystem.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				disableParentScroll: false,
				clickOutsideToClose: true
			})
			.then(function() {
			}, function() {
			});
		};
		
		$scope.roadmap = {
			autoHideScrollbar: false,
			theme: 'rounded',
			advanced:{
				updateOnContentResize: true,
				autoUpdateTimeout: 60
			},
			mouseWheel: {
				enable: false
			},
			scrollButtons: {
				enable: false
			},
			axis: 'x'
		};
		
		$scope.showTeam = function(ev, id) {
			$mdDialog.show({
				controller: 'TeamCtrl',
				templateUrl: '/view/team.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				disableParentScroll: false,
				clickOutsideToClose: true,
				locals: {
					id: id
				}
			})
			.then(function() {
			}, function() {
			});
		};
		
		var rellax = new Rellax('.rellax', {
			speed: 4,
			center: true,
			percentage: 0.5
		});
	}
})();