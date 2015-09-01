_app.controller('MyProfileCtrl', function($scope, user, FlashMessagesService){

  $scope.user = user;
  $scope.errors = '';
  $scope.updating = false;
  $scope.updatingBasicInfo = false;
  $scope.changingPassword = false;

  var initialPassword = {
    current: "",
    new: "",
    new_confirmation: ""
  };

  $scope.password = initialPassword;

  $scope.changePassword = function() {
    $scope.changingPassword = true;
    $scope.user.password = $scope.password;
    $scope.user.changePassword(
      function () {
        $scope.errors = '';
        $scope.changingPassword = false;
        $scope.password = initialPassword;
        FlashMessagesService.success('Your password has been changed successfully.');
      },
      function (response) {
        $scope.changingPassword = false;
        $scope.errors = response.data;
      }
    );
  };

  $scope.updateBasicInfo = function() {
    $scope.updatingBasicInfo = true;
    $scope.user.updateBasicInfo(
      function () {
        $scope.errors = '';
        $scope.updatingBasicInfo = false;
        $scope.password = initialPassword;
        FlashMessagesService.success('Your Basic Info has been updated.');
      },
      function (response) {
        $scope.updatingBasicInfo = false;
        $scope.errors = response.data;
      }
    );
  };

  $scope.update = function () {
    $scope.updating = true;
    $scope.user.update(
      function () {
        $scope.errors = '';
        FlashMessagesService.success('Profile successfully updated');
        $scope.updating = false;
      },
      function (response) {
        $scope.updating = false;
        $scope.errors = response.data;
      }
    );
  };

});