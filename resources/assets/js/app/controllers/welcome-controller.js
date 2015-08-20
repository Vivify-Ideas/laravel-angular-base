'use strict';

angular.module('LaravelAngularApp')
  .controller('WelcomeCtrl', ['$scope', 'angularString', function($scope, angularString) {
    $scope.angularString = angularString;
  }
]);