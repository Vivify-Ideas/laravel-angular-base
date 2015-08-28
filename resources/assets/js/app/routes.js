_app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('dashboard', {
      url: '/',
      controller: 'DashboardCtrl',
      templateUrl: 'dashboard.html'
    });

});