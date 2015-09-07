_app.factory('ErrorHttpResponseInterceptor', function($q, $injector) {
  return {
    responseError: function(rejection) {
      if (rejection.status === 401) {
        $injector.get('AuthService').clearUser();
        $injector.get('$state').go('login');
      }

      return $q.reject(rejection);
    }
  };
});
