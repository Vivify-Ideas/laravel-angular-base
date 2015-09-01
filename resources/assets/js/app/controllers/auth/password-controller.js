_app.controller('PasswordCtrl', function ($scope, AuthService) {

  $scope.credentials = {};
  $scope.errors = {};
  $scope.emailSent = false;
  $scope.busy = false;

  var passwordResetError = function(errors) {
    $scope.errors = errors;
    $scope.busy = false;
  };

  var passwordResetSuccessCallback = function(data) {
    $scope.emailSent = data.status;
    $scope.busy = false;
  };

  $scope.sendPasswordResetLink = function() {
    $scope.busy = true;
    AuthService.sendPasswordResetLink($scope.credentials, passwordResetSuccessCallback, passwordResetError);
  };

});
