_app.controller('PasswordCtrl', function ($scope, AuthService) {

  $scope.credentials = {};
  $scope.errors = {};

  var passwordResetError = function(errors) {
    $scope.errors = errors;
  };

  $scope.sendPasswordResetLink = function() {
    AuthService.sendPasswordResetLink($scope.credentials, passwordResetError);
  };

});
