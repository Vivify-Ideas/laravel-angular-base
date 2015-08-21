'use strict';

LaravelAngularApp.factory('FileModel', function(BaseModel, routes) {
    var FileModel = BaseModel(
      routes.files,
      {
        id: '@id'
      }
    );

    FileModel.prototype.destroy = function (success, error) {
      if (this.local_copy) {
        // with 'local_copy' we have possibility to mark a model as temporary on client side
        delete this;

        if (success) {
          success();
        }

        return;
      }

      return this.$_destroy({}, success, error);
    };

    return FileModel;
  });