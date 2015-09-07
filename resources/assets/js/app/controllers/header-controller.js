_app.controller('HeaderCtrl', function ($scope, AuthService, $translate) {

  $scope.navbarCollapsed = true;

  $scope.activeUser = function() {
    return AuthService.user;
  };

  $scope.logout = function() {
    AuthService.logout();
  };

  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };

});
