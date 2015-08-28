_app.factory('FilesCollection', function(BaseCollection, FileModel) {
    var FilesCollection = BaseCollection(FileModel);

    return FilesCollection;
  });
