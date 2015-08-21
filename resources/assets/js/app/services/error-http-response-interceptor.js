'use strict';

_app.factory('ErrorHttpResponseInterceptor', function($q, $window, routes) {
  return {
    responseError: function(rejection) {
      if (rejection.status === 401) {
        $window.location.href = routes.logout;
      }

      return $q.reject(rejection);
    }
  };
});
