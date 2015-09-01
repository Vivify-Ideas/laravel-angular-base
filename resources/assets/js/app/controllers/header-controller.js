_app.controller('HeaderCtrl', function ($scope, AuthService, activeUser, $translate) {

  $scope.navbarCollapsed = true;
  $scope.activeUser = activeUser;

  $scope.logout = function() {
    AuthService.logout();
  };

  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };

});
