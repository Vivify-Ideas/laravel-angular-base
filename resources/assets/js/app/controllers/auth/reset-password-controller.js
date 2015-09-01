_app.controller('ResetPasswordCtrl', function ($scope, AuthService, token) {

  $scope.credentials = {
    token : token
  };
  $scope.errors = {};
  $scope.busy = false;

  var resetPasswordErrorCallback = function(errors) {
    $scope.errors = errors;
    $scope.busy = false;
  };

  $scope.resetPassword = function() {
    $scope.busy = true;
    AuthService.resetPassword($scope.credentials, resetPasswordErrorCallback);
  };

});
