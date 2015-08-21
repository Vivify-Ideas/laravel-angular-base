'use strict';

LaravelAngularApp.factory('activeUser', function(UserModel, $window) {
    return new UserModel($window._mb_data.activeUser);
  });