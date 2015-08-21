'use strict';

window.LaravelAngularApp = angular.module('LaravelAngularApp',[ 'ui.router', 'templates'])

  .config(function ($provide) {
    $provide.constant('routes', angular.copy(window._routes));
  })

;
