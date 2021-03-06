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
      filter: 'guest',
      resolve: {
        token: function ($stateParams) {
          return $stateParams.token;
        }
      }
    })
    .state('my-profile', {
      url: '/my-profile',
      filter: 'authenticated',
      controller: 'MyProfileCtrl',
      templateUrl: 'my-profile.html',
      resolve: {
        user: function (AuthService) {
          return AuthService.user;
        }
      }
    })
    .state('billing', {
      url: '/billing',
      filter: 'authenticated',
      controller: 'BillingCtrl',
      templateUrl: 'account/billing.html',
      resolve: {
        card: function (CardModel, AuthService) {
          return CardModel.get({id: 0, user_id: AuthService.user.id});
        },
        invoices: function (InvoicesCollection, AuthService) {
          return (new InvoicesCollection).query({user_id: AuthService.user.id});
        }
      }
    })
    .state('change-plan', {
      url: '/change-plan',
      filter: 'authenticated',
      templateUrl: 'account/change-plan.html',
      controller: 'ChangePlanCtrl',
      resolve: {
        user: function (AuthService) {
          return AuthService.user;
        },
        plans: function (PlansCollection) {
          return (new PlansCollection).query();
        },
        card: function (CardModel, AuthService) {
          return CardModel.get({id: 0, user_id: AuthService.user.id});
        }
      }
    })


  ;
});