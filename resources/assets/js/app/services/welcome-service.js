'use strict';

angular.module('LaravelAngularApp')
  .factory('DashboardService', function($http, $q) {

    var DashboardService = {
      getAngularString: function () {
          return $http.get('/angular-test')
                      .then(function(response, status, headers, config) {
                        return response.data;
                      }, function(error, status, headers, config){
                        return error.data;
                      });
        },
    };

    return DashboardService;
  });