angular.module('ui.bootstrap.alert')
  .controller('AlertController', ['$scope', '$attrs', function ($scope, $attrs) {
    $scope.closeable = !angular.isUndefined($attrs.close);
    this.close = $scope.close;
  }]);
