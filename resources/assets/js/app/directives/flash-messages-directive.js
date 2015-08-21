'use strict';

LaravelAngularApp.factory('FlashMessagesService', function($rootScope, $timeout) {
    $rootScope.flashMessages = [];
    var hideAfter = 5000;

    $rootScope.$on('$stateChangeStart', function(event) {
      // if page is changed, clear all messages
      $rootScope.flashMessages = [];
    });

    return {
      show: function (type, message, closable, autohide) {
        var message = {
          type: type,
          content: message,
          closable: _.isUndefined(closable) ? true : closable
        };

        $rootScope.flashMessages.push(message);

        if (autohide !== false) {
          $timeout(function () {
            _.remove($rootScope.flashMessages, message);
          }, hideAfter);
        }
      },
      hide: function (index) {
        $rootScope.flashMessages.splice(index, 1);
      },
      clearAll: function () {
        $rootScope.flashMessages = [];
      },
      success: function (message, closable, autohide) {
        this.show('success', message, closable, autohide);
      },
      danger: function (message, closable, autohide) {
        this.show('danger', message, closable, autohide);
      },
      warning: function (message, closable, autohide) {
        this.show('warning', message, closable, autohide);
      }
    };
  })
  .directive('flashMessages', function(FlashMessagesService) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'directives/flash-messages.html',
      link: function($scope, element, attrs) {
        $scope.closeAlert = function(index) {
          return FlashMessagesService.hide(index);
        };
      }
    };
  });