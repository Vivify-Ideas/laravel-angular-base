_app.factory('AuthService', function(UserModel, $window, routes, $http, $state) {
  var goHome = function() {
    $state.go('dashboard');
  };

  var AuthService = {
    init : function() {
      this.setUser($window._app_data.activeUser);
      $window._app_data.activeUser = null;
    },
    user : null,
    setUser : function(user) {
      this.user = new UserModel(user);
    },
    clearUser : function() {
      return this.setUser(null);
    },
    check: function() {
      return this.user.id ? true : false;
    },
    isAdmin : function() {
      return this.user.is_admin ? true : false;
    },
    login: function (credentials, errorCallback) {
      var self = this;
      $http.post(routes.login, credentials)
      .then(function (response) {
        self.setUser(response.data);
        goHome();
      }, function(response) {
        errorCallback(response.data);
      });
    },
    logout: function () {
      var self = this;
      $http.get(routes.logout)
      .then(function (response) {
        self.clearUser();
        goHome();
      });
    },
    signUp: function(credentials, errorCallback) {
      var self = this;
      $http.post(routes.signup, credentials)
      .then(function (response) {
        self.setUser(response.data);
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
      var self = this;
      $http.post(routes.reset_password, credentials)
      .then(function (response) {
        self.setUser(response.data);
        goHome();
      }, function(response) {
        errorCallback(response.data);
      });
    }

  };

  AuthService.init();

  return AuthService;
});
