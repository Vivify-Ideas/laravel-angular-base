_app.controller('SignupCtrl', function ($scope, AuthService, activeUser, UserModel) {

  $scope.credentials = {};
  $scope.errors = {};
  $scope.busy = false;

  var signupErrorCallback = function(errors) {
    $scope.errors = errors;
    $scope.busy = false;
  };

  $scope.signUp = function() {
    $scope.busy = true;
    AuthService.signUp($scope.credentials, signupErrorCallback);
  };

});
