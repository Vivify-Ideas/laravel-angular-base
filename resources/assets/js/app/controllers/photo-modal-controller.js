'use strict';

_app.controller('PhotoModal', function($scope, $modalInstance, model, submodel,
     field, resourceLabel, ratio, warningText, dialogs, PhotoModalService) {

      $scope.resourceLabel = resourceLabel;
      $scope.file = model[submodel];
      $scope.ratio = ratio;
      $scope.warningText = warningText;
      $scope.uploadedPhoto = $scope.file;

      var handleResponseCallback = function(isDelete) {
        if(isDelete) {
          $scope.file = null;
          $scope.busyDelete = false;
        } else {
          $scope.file.url += '?';
          $scope.busy = false;
          $modalInstance.close();
        }
      };

      $scope.remove = function () {
        dialogs.confirm('Confirmation', 'Are you sure want to remove your current photo?')
            .result.then(function(btn) {
              $scope.busyDelete = true;
              PhotoModalService.removePhoto(model, $scope.file, handleResponseCallback);
            });
      };

      $scope.save = function () {
        $scope.busy = true;
        angular.extend($scope.file, $scope.uploadedPhoto);
        PhotoModalService.savePhoto(model, $scope.file, handleResponseCallback);
      };

      $scope.close = function () {
        $modalInstance.dismiss('cancel');
      };

      $scope.getUploadedPhoto = function(photo) {
        $scope.uploadedPhoto = photo;
      }
});