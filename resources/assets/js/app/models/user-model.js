'use strict';

LaravelAngularApp.factory('UserModel', function(BaseModel, routes, FileModel) {
    var UserModel = BaseModel(
      routes.users,
      {
        id: '@id'
      }
    );

    return UserModel;
  });