'use strict';

angular.module('LaravelAngularApp')
  .controller('WelcomeCtrl', function($scope, angularString) {
    $scope.angularString = angularString;
  }
);