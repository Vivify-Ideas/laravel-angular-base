'use strict';

_app.factory('UserModel', function(BaseModel, routes, FileModel) {
    var UserModel = BaseModel(
      routes.users,
      {
        id: '@id'
      }
    );

    return UserModel;
  });