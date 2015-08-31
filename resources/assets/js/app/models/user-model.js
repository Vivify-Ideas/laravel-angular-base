_app.factory('UserModel', function(BaseModel, routes) {
    var UserModel = BaseModel(
      routes.users,
      {
        id: '@id'
      }
    );

    return UserModel;
  });