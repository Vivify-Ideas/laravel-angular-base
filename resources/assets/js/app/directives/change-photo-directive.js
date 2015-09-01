'use strict';

_app.directive('changePhoto', function($modal, FileModel) {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      templateUrl: 'directives/change-photo.html',
      scope: {
        model: '=',
        modelName: '@model',
        submodel: '@',
        field: '@',
        ratio: '@',
        resourceLabel: '@'
      },
      link: function($scope, element, attrs) {

        $scope.openPhotoModal = function () {

          $modal.open({
            controller: 'PhotoModal',
            templateUrl: 'directives/photo-modal.html',
            resolve: {
              model: function() {
                if(angular.isUndefined($scope.model[$scope.submodel])) {
                  $scope.model[$scope.submodel] = new FileModel();
                }
                $scope.model[$scope.submodel].type = $scope.modelName + '_' + $scope.submodel;
                return $scope.model;
              },
              submodel: function() {
                return $scope.submodel;
              },
              field: function() {
                return $scope.field;
              },
              resourceLabel: function() {
                return $scope.resourceLabel;
              },
              ratio: function () {
                return $scope.ratio;
              },
              warningText: function () {
                return '';
              }
            }
          });
        };
      }

    };
  });