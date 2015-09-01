_app.controller('PasswordCtrl', function ($scope, AuthService, FlashMessagesService) {

  $scope.credentials = {};
  $scope.errors = {};
  $scope.busy = false;

  var passwordResetError = function(errors) {
    $scope.errors = errors;
    $scope.busy = false;
  };

  var passwordResetSuccessCallback = function(data) {
    FlashMessagesService.success(data.status);
    $scope.busy = false;
  };

  $scope.sendPasswordResetLink = function() {
    $scope.busy = true;
    AuthService.sendPasswordResetLink($scope.credentials, passwordResetSuccessCallback, passwordResetError);
  };

});
