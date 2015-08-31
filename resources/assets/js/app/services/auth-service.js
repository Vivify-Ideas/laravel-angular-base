_app.factory('AuthService', function(activeUser, routes, $http, $window, FlashMessagesService) {

  var AuthService = {
    isAuthenticated: function() {
      return activeUser.id;
    },
    login: function (credentials, errorCallback) {
      $http.post(routes.login, credentials)
      .then(function (response) {
        activeUser = response.activeUser;
        $window.location.href = routes.home;
      }, function(response) {
        errorCallback(response.data);
      });
    },
    logout: function () {
      $http.get(routes.logout)
      .then(function (response) {
        $window.location.href = routes.home;
      });
    }, 
    signUp: function(credentials, errorCallback) {
      $http.post(routes.signup, credentials)
      .then(function (response) {
        activeUser = response.activeUser;
        $window.location.href = routes.home;
      }, function(response) {
        errorCallback(response.data);
      });
    },
    sendPasswordResetLink: function(credentials, errorCallback) {
      $http.post(routes.password, credentials)
      .then(function (response) {
        FlashMessagesService.success(response.data.status);
      }, function(response) {
        errorCallback(response.data);
      });
    },
    resetPassword: function(credentials, errorCallback) {
      $http.post(routes.resetPassword, credentials)
      .then(function (response) {
        activeUser = response.activeUser;
        $window.location.href = routes.home;
      }, function(response) {
        errorCallback(response.data);
      });
    }


  };

  return AuthService;
});
