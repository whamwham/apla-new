(function(){
	'use strict';

	angular.module('app').controller('LanguageSwitchCtrl', LanguageSwitchCtrl);
	
	LanguageSwitchCtrl.$inject = ['$rootScope', '$scope', '$translate'];
	
	function LanguageSwitchCtrl($rootScope, $scope, $translate){
		$scope.changeLanguage = function(langKey) {
			$translate.use(langKey);
		};
		
		$rootScope.$on('$translateChangeSuccess', function(event, data) {
			var language = data.language;
			$rootScope.lang = language;
		});
	}
})();