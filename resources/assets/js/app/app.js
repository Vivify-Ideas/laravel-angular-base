'use strict';

window._app = angular.module('LaravelAngularApp',[
    'ui.router',
    'ui.bootstrap',
    'templates',
    'ngNestedResource',
    'ngSanitize',
    'dialogs.main',
    'angular-ladda',
    'angular-spinkit',
    'ngFileUpload',
    'pascalprecht.translate',
    'angular-stripe',
    'credit-cards'
  ])
  .config(function ($provide) {
    $provide.constant('routes', angular.copy(window._routes));
  })
  .config(['$httpProvider', 'laddaProvider', 'stripeProvider', function ($httpProvider, laddaProvider, stripeProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    $httpProvider.interceptors.push('ErrorHttpResponseInterceptor');
    laddaProvider.setOption({style: 'expand-left'});
    stripeProvider.setPublishableKey(window._app_data.stripePublishableKey);
  }])
  .config(['$translateProvider', function($translateProvider) {
    $translateProvider.translations(_app_data.preferredLanguage.key, _app_data.preferredLanguage.strings);
    $translateProvider.useStaticFilesLoader({
      prefix: '/i18n/locale-',
      suffix: '.json?' + Date.now()
    });
    $translateProvider.preferredLanguage(_app_data.preferredLanguage.key);
    $translateProvider.useSanitizeValueStrategy('sanitize');
  }])
  .run(function($rootScope, $state, RouteFilterService){
    $rootScope.pageBusy = true;
    $rootScope.projectName = window._app_data.projectName;
    $rootScope.$on('$viewContentLoaded', function(event) {
      $rootScope.pageBusy = false;
    });
  });
;