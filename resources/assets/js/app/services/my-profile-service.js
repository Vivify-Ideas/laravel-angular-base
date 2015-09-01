_app.factory('MyProfileService', function(FlashMessagesService) {

  var MyProfileService = {
    updateBasicInfo: function(user, handleResponseCallback) {
      user.updateBasicInfo(
        function () {
          handleResponseCallback('');
          FlashMessagesService.success('Your Basic Info has been updated.');
        },
        function (response) {
          handleResponseCallback(response.data);
        }
      );
    },
    changePassword: function(user, password, handleResponseCallback) {
      user.password = password;
      user.changePassword(
        function () {
          handleResponseCallback('');
          FlashMessagesService.success('Your password has been changed successfully.');

        },
        function (response) {
          handleResponseCallback(response.data);
        }
      );
    }
  };

  return MyProfileService;

});