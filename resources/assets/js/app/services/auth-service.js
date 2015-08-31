_app.factory('AuthService', function(activeUser, routes, $http, $window) {
  console.log(activeUser.id);
  var AuthService = {
    isAuthenticated: function() {
      return activeUser;
    },
    login: function (credentials) {
      return true;
    },
    logout: function () {
      $http.get(routes.logout)
      .then(function (response) {
        $window.location.href = routes.home;
      });
    }, 
    signUp: function(credentials, error) {
      $http.post(routes.signup, credentials)
      .then(function (response) {
        activeUser = response.activeUser;
        $window.location.href = routes.home;
      }, function(response) {
        error(response.data);
      });
    }

  };
  
  return AuthService;
});
