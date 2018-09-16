(function(){
	'use strict';

	angular.module('app').controller('TeamCtrl', TeamCtrl);
	
	TeamCtrl.$inject = ['$rootScope', '$scope', '$http', '$mdDialog', 'id'];
	
	function TeamCtrl($rootScope, $scope, $http, $mdDialog, id){
		$http({
			method: 'GET',
			url: 	'/locale/' + $rootScope.lang + '.json'
		})
		.then(function(response) {
			$scope.team = response.data.MAIN.TEAM[id];
		}, function(error) {
			console.log(error);
		});
		
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
	}
})();