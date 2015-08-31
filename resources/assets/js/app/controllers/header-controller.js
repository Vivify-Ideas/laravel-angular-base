_app.controller('HeaderCtrl', function ($scope, AuthService, activeUser) {

  $scope.navbarCollapsed = true;
  $scope.activeUser = activeUser;

  $scope.logout = function() {
    AuthService.logout();
  };

});
