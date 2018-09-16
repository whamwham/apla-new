(function(){
	'use strict';
	
	angular.module('app').config(AppConfig);
	
	AppConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', '$urlMatcherFactoryProvider', 'cfpLoadingBarProvider', '$translateProvider'];
	
	function AppConfig($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, $urlMatcherFactoryProvider, cfpLoadingBarProvider, $translateProvider) {
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		
		var param = function(obj) {
			var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

			for(name in obj) {
				value = obj[name];

				if(value instanceof Array) {
					for(i=0; i<value.length; ++i) {
						subValue = value[i];
						fullSubName = name + '[' + i + ']';
						innerObj = {};
						innerObj[fullSubName] = subValue;
						query += param(innerObj) + '&';
					}
				} else if(value instanceof Object) {
					for(subName in value) {
						subValue = value[subName];
						fullSubName = name + '[' + subName + ']';
						innerObj = {};
						innerObj[fullSubName] = subValue;
						query += param(innerObj) + '&';
					}
				} else if(value !== undefined && value !== null) {
					query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
				}
			}

			return query.length ? query.substr(0, query.length - 1) : query;
		};

		// Override $http service's default transformRequest
		$httpProvider.defaults.transformRequest = [function(data) {
			return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
		}];
		
		cfpLoadingBarProvider.includeSpinner = false;
		cfpLoadingBarProvider.startSize = 0.02;
		cfpLoadingBarProvider.latencyThreshold = 10;
		
		$stateProvider.state('root', {
			url: '/',
			views: {
				'header@': {
					templateUrl: '/view/header.html?' + new Date().getTime(),
					controller: 'HeaderCtrl'
				},
				'main@': {
					templateUrl: '/view/main.html?' + new Date().getTime(),
					controller: 'MainCtrl'
				},
				'footer@': {
					templateUrl: '/view/footer.html?' + new Date().getTime(),
					controller: 'FooterCtrl'
				}
			}
		});
		
		$stateProvider.state('root.Download', {
			url: 'download/',
			views: {
				'main@': {
					templateUrl: '/view/download.html?' + new Date().getTime(),
					controller: 'DownloadCtrl'
				}
			}
		});
		
		$stateProvider.state('root.Government', {
			url: 'government/',
			views: {
				'main@': {
					templateUrl: '/view/government.html?' + new Date().getTime(),
					controller: 'GovernmentCtrl'
				}
			}
		});
		
		$stateProvider.state('root.Business', {
			url: 'business/',
			views: {
				'main@': {
					templateUrl: '/view/business.html?' + new Date().getTime(),
					controller: 'BusinessCtrl'
				}
			}
		});
		
		$translateProvider
			.useStaticFilesLoader({
				prefix: '/locale/',
				suffix: '.json'
			})
			.preferredLanguage('en')
			.useLocalStorage()
			.useMissingTranslationHandlerLog()
			.useSanitizeValueStrategy(null);
		
		$httpProvider.interceptors.push(function ($q) {
			return {
				request: function (config) {
					if(/^\/view/.test(config.url)){
						if(location.hostname === 'localhost'){
							config.url = '.' + config.url;
						} else {
							config.url = '' + config.url;
						}
					}
					return config || $q.when(config);
				},
				response: function (response) {
					return response;
				},
				responseError: function (response) {
					return $q.reject(response);
				}
			};
		});
		
		$urlRouterProvider.when('', '/');
		$urlRouterProvider.otherwise(function ($injector) {
			var $state = $injector.get("$state");
			$state.go("root");
		});
		
		$urlMatcherFactoryProvider.strictMode(false);
		if(location.hostname === 'localhost'){
			$locationProvider.html5Mode({
				enabled: false,
				requireBase: false
			});
		} else {
			$locationProvider.html5Mode({
				enabled: true,
				requireBase: false
			});
		}
	}
})();