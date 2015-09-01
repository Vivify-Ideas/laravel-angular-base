_app.controller('MyProfileCtrl', function($scope, user, MyProfileService){

  var resetLaddaSpinners = function() {
    $scope.updatingBasicInfo = false;
    $scope.changingPassword = false;
  }

  var updateFinished = function(errors){
    resetLaddaSpinners();
    $scope.errors = errors;
    $scope.password = initialPassword;
  };

  var initialPassword = {
    current: "",
    new: "",
    new_confirmation: ""
  };

  $scope.password = initialPassword;

  $scope.user = user;
  $scope.errors = '';

  resetLaddaSpinners();

  $scope.updateBasicInfo = function() {
    $scope.updatingBasicInfo = true;

    MyProfileService.updateBasicInfo($scope.user, updateFinished);

  };

  $scope.changePassword = function() {
    $scope.changingPassword = true;

    MyProfileService.changePassword($scope.user, $scope.password, updateFinished);

  };

});