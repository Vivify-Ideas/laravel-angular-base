_app.directive('attachFiles', function(Upload, FileModel) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: function($elem, $attrs) {
        var templates = {
          attach_files : 'directives/attach-files.html',
          file_uploader : 'directives/file-uploader.html'
        };
        return $attrs.template && templates[$attrs.template] ? templates[$attrs.template] : templates['attach_files'];
      },
      scope: {
        files: '=',
        type: '@',
        multiple: '@?',
        accept: '@?',
        model: '=',
        onUpload: '='
      },
      link: function($scope, element, attrs) {
        $scope.progress = 0;
        $scope.error = '';

        if ($scope.accept) {
          var acceptPattern = new RegExp($scope.accept, "i");
        }

        if (!$scope.files) {
          $scope.files = [];
        }

        $scope.validate = function (file) {
          if (acceptPattern) {
            if (!acceptPattern.test(file.type) && !acceptPattern.test(file.name)) {
              $scope.error = 'File type not allowed';
              return false;
            }
          }

          $scope.error = '';
          return true;
        };

        $scope.upload = function(files, event) {
          if (!$scope.isMultiple() && $scope.files.length) {
            $scope.clear();
          }

          angular.forEach(files, function (file) {
            if ($scope.progress == 0) {
              $scope.progress = 1;
            }

            Upload.upload({
              url: '/files',
              method: 'POST',
              fields: {type: $scope.type ? $scope.type : $scope.model.type},
              file: file
            }).progress(function(evt) {
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
              }).success(function(data, status, headers, config) {
                $scope.progress = 0;

                if (!$scope.files) {
                  $scope.files = [];
                }

                $scope.files.push(new FileModel(data));
                if ($scope.onUpload) {
                  $scope.onUpload(data);
                }

              }).error(function() {
                $scope.progress = 0;
              });
          });
        };

        $scope.removeFile = function (file) {
          _.remove($scope.files, {id: file.id});
          file.destroy();
        };

        $scope.clear = function () {
          angular.forEach($scope.files, function (file) {
            file.destroy();
          });

          $scope.files = [];
        };

        $scope.isMultiple = function () {
          return _.isUndefined(attrs.multiple) ? true : attrs.multiple === "true";
        };
      }
    }
  });