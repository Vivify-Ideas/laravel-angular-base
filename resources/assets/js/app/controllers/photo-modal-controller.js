'use strict';

_app.controller('PhotoModal', function($scope, $modalInstance, model, submodel,
     field, resourceLabel, ratio, warningText, dialogs) {

      $scope.resourceLabel = resourceLabel;
      $scope.file = model[submodel];
      $scope.ratio = ratio;
      $scope.warningText = warningText;

      var updateModel = function (deleted) {
        if(deleted === true) {
          model[field] = null;
          $scope.file = null;
        } else {
          $scope.file.url += '?';
          model[field] = $scope.file.id;
        }
        model.update();
      };

      $scope.remove = function () {
        dialogs.confirm('Confirmation', 'Are you sure want to remove your current photo?')
          .result.then(function(btn){
            $scope.busyDelete = true;
            $scope.file.destroy(function () {
              $modalInstance.close();
              updateModel(true);
              $scope.busyDelete = false;
            });
          });
      };

      $scope.save = function () {
        $scope.busy = true;
        $scope.file.save(function () {
          $modalInstance.close();
          updateModel();
          $scope.busy = false;
        });
      };

      $scope.close = function () {
        $modalInstance.dismiss('cancel');
      };
});