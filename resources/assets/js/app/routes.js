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
      templateUrl: 'auth/signup.html',
      filter: 'guest'
    })
    .state('login', {
      url: '/login',
      controller: 'LoginCtrl',
      templateUrl: 'auth/login.html',
      filter: 'guest'
    })
    .state('password', {
      url: '/password',
      controller: 'PasswordCtrl',
      templateUrl: 'auth/password.html',
      filter: 'guest'
    })
    .state('reset-password', {
      url: '/reset-password/{token}',
      controller: 'ResetPasswordCtrl',
      templateUrl: 'auth/reset-password.html',
      filter: 'guest'
,      resolve: {
        token: function ($stateParams) {
          return $stateParams.token;
        }
      }
    })
    .state('my-profile', {
      url: '/my-profile',
      filter: 'authenticated'
    })

  ;


});