_app.controller('ResetPasswordCtrl', function ($scope, AuthService, token) {

  $scope.credentials = {
    token : token
  };
  $scope.errors = {};

  var resetPasswordError = function(errors) {
    $scope.errors = errors;
  };

  $scope.resetPassword = function() {
    AuthService.resetPassword($scope.credentials, resetPasswordError);
  };

});
