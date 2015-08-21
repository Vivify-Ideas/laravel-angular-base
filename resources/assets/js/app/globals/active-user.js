'use strict';

_app.factory('activeUser', function(UserModel, $window) {
    return new UserModel($window._app_data.activeUser);
  });