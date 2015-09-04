_app.directive('imageCropper', function($timeout) {
  return {
    restrict: 'E',
    templateUrl: 'directives/image-cropper.html',
    replace: true,
    scope: {
      model: '=',
      aspectRatio: '@',
    },
    link: function($scope, element, attrs) {
      var imgEl = element.find('.crop');
      var options = {};

      if ($scope.aspectRatio) {
        options.aspectRatio = $scope.aspectRatio;
      }

      var updateCoords = function (selection) {
        $scope.model.selection = selection;
      };

      var destroyJcrop = function() {
        var jCropApi = imgEl.data('Jcrop');
        if (jCropApi) {
          jCropApi.destroy();
        }
      };

      options.onSelect = updateCoords;
      options.onChange = updateCoords;

      var makeCropper = function (model) {
        destroyJcrop();

        // postpone execution so there is enough time for destroying existing jcrop obj
        $timeout(function() {
          imgEl.attr('src', model.url_original);

          var size = model.origin_size.width < model.origin_size.height ?
              model.origin_size.width : model.origin_size.height;

          options.setSelect = model.selection ?
              [model.selection.x, model.selection.y, model.selection.x2, model.selection.y2] :
              [0, 0, size, size];

          options.keySupport = false;
          options.trueSize = [model.origin_size.width, model.origin_size.height];

          imgEl.Jcrop(options);
        }, 100);

      };

      makeCropper($scope.model);

      $scope.$watch('model', function (newValue, oldValue) {
        if (newValue.url !== oldValue.url) {
          makeCropper($scope.model);
        }
      }, true);

      $scope.$on('$destroy', function() {
        destroyJcrop();
      });
    }
  };
});