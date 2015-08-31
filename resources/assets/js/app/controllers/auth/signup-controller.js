_app.controller('SignupCtrl', function ($scope, AuthService) {

  $scope.credentials = {};
  $scope.errors = {};

  var signupError = function(errors) {
    $scope.errors = errors;
  };

  $scope.signUp = function() {
   AuthService.signUp($scope.credentials, signupError);
  };

  });
