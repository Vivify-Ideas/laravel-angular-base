'use strict';

LaravelAngularApp.controller('WelcomeCtrl', function($scope, angularString, FlashMessagesService, $timeout) {
    $scope.angularString = angularString;


    $timeout(function () {
      FlashMessagesService.success('Hello there !!');
    }, 1000);

    $timeout(function () {
      FlashMessagesService.danger('I\'m a flash message');
    }, 2000);

    $timeout(function () {
      FlashMessagesService.warning('Ooooh Yeaaah!');
    }, 5000);

  }
);