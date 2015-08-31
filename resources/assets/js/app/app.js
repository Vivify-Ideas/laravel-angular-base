'use strict';

window._app = angular.module('LaravelAngularApp',[
    'ui.router',
    'ui.bootstrap',
    'templates',
    'ngNestedResource',
    'ngSanitize',
    'dialogs.main',
    'angular-ladda',
    'angular-spinkit'
  ])
  .config(function ($provide) {
    $provide.constant('routes', angular.copy(window._routes));
  })
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    $httpProvider.interceptors.push('ErrorHttpResponseInterceptor');
    $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = window._app_data.csrfToken;
  }])
  .run(function($rootScope){
    $rootScope.pageBusy = true;

    $rootScope.$on('$stateChangeStart', function(event) {
      $rootScope.pageBusy = true;
    });

    $rootScope.$on('$viewContentLoaded', function(event) {
      $rootScope.pageBusy = false;
    });

  });
;