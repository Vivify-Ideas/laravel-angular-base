_app.factory('PhotoModalService', function(){

  var updateUser = function (user, isDeleted, photo) {
    if(isDeleted === true) {
      user.photo_id = null;
    } else {
      user.photo_id = photo.id;
    }
    user.update();
  };

  var PhotoModalService = {
    removePhoto: function(user, photo, handleResponseCallback) {
      photo.destroy(function () {
        updateUser(user, true);
        handleResponseCallback(true);
      });
    },
    savePhoto: function(user, photo, handleResponseCallback) {
      photo.save(function () {
        updateUser(user, false, photo);
        handleResponseCallback();
      });
    }
  };

  return PhotoModalService;

});