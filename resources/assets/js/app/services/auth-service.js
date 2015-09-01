_app.factory('AuthService', function(activeUser, routes, $http, $window) {

  var setUser = function(user) {
    activeUser.resource = user;
  };

  var goHome = function() {
    $window.location.href = routes.home;
  };

  var AuthService = {
    isAuthenticated: function() {
      return activeUser.id;
    },
    login: function (credentials, errorCallback) {
      $http.post(routes.login, credentials)
      .then(function (response) {
        setUser(response.data);
        goHome();
      }, function(response) {
        errorCallback(response.data);
      });
    },
    logout: function () {
      $http.get(routes.logout)
      .then(function (response) {
        goHome();
      });
    },
    signUp: function(credentials, errorCallback) {
      $http.post(routes.signup, credentials)
      .then(function (response) {
        setUser(response.data);
        goHome();
      }, function(response) {
        errorCallback(response.data);
      });
    },
    sendPasswordResetLink: function(credentials, successCallback, errorCallback) {
      $http.post(routes.password, credentials)
      .then(function (response) {
        successCallback(response.data);
      }, function(response) {
        errorCallback(response.data);
      });
    },
    resetPassword: function(credentials, errorCallback) {
      $http.post(routes.resetPassword, credentials)
      .then(function (response) {
        setUser(response.data);
        goHome();
      }, function(response) {
        errorCallback(response.data);
      });
    }


  };

  return AuthService;
});
