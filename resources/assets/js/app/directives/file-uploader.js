'use strict';

_app.directive('fileUploader', function(Upload, $timeout, FlashMessagesService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'directives/file-uploader.html',
    scope: {
      model: '=',
      accept: '@', // watch for file name regex and for input accept attribute!
      text: '@',
      onUpload: '&?'
    },
    link: function($scope, element, attrs) {
      $scope.progress = 0;
      var acceptPattern = new RegExp($scope.accept, "i");

      $scope.triggerFileSelect = function () {
        $timeout(function () {
          element.find('buuton').click();
        }, 0);
      };

      var checkTypes = function (files) {
        var filesWithWrongType = [];

        angular.forEach(files, function (file) {
          if(!acceptPattern.test(file.type) && !acceptPattern.test(file.name)) {
            filesWithWrongType.push(file.name);
          }
        });

        if(filesWithWrongType.length) {
          var message = 'Next files can\'t be uploaded due to not allowed file type: ' + filesWithWrongType.join(',');
          FlashMessagesService.show('danger', message);
          return false;
        }

        return true;
      };

      $scope.upload = function(files, event) {
        if(checkTypes(files)) {
          $scope.progress = 1;
          angular.forEach(files, function (file) {
            Upload.upload({
              url: '/files',
              method: 'POST',
              fields: {type: $scope.model.type},
              file: file
            }).progress(function(evt) {
              $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            }).success(function(data, status, headers, config) {
              $scope.progress = 0;
              angular.extend($scope.model, data);
              if ($scope.onUpload) {
                $scope.onUpload();
              }
            });
          });
        }
      };
    }
  };
});