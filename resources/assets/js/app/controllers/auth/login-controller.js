_app.controller('LoginCtrl', function ($scope, AuthService) {

  $scope.credentials = {};
  $scope.errors = {};

  var loginError = function(errors) {
    $scope.errors = errors;
  };

  $scope.login = function() {
    AuthService.login($scope.credentials, loginError);
  };

});
