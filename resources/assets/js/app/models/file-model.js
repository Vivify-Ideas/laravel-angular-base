_app.factory('FileModel', function(BaseModel, routes) {
    var FileModel = BaseModel(
      routes.files,
      {
        id: '@id'
      }
    );

    return FileModel;
  });