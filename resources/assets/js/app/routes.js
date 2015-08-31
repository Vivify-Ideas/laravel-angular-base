_app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('dashboard', {
      url: '/',
      controller: 'DashboardCtrl',
      templateUrl: 'dashboard.html'
    })
    .state('privacy-policy', {
      url: '/privacy-policy',
      templateUrl: 'privacy-policy.html'
    })
    .state('terms-of-use', {
      url: '/terms-of-use',
      templateUrl: 'terms-of-use.html'
    })
    .state('signup', {
      url: '/signup',
      controller: 'SignupCtrl',
      templateUrl: 'auth/signup.html'
    })
    .state('login', {
      url: '/login',
      controller: 'LoginCtrl',
      templateUrl: 'auth/login.html'
    })
    .state('password', {
      url: '/password',
      controller: 'PasswordCtrl',
      templateUrl: 'auth/password.html'
    })
    .state('reset-password', {
      url: '/reset-password/{token}',
      controller: 'ResetPasswordCtrl',
      templateUrl: 'auth/reset-password.html',
      resolve: {
        token: function ($stateParams) {
          return $stateParams.token;
        }
      }
    })

  ;


});