'use strict';


LaravelAngularApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('welcome', {
      url: '/',
      controller: 'WelcomeCtrl',
      templateUrl: 'welcome.html',
      resolve: {
        angularString: function(DashboardService){
          return DashboardService.getAngularString();
        }
      }

    });

});