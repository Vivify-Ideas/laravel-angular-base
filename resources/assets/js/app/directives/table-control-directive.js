_app.directive('tableControl', function($filter) {
    return {
      restrict: 'A',
      scope: {
        tableCollection: '=',
        tableDefaultSort: '@?'
      },
      link: function($scope, element, attrs) {
        $scope.reverse = true;
        $scope.filter = {
          direction: 'desc',
          order_by: $scope.tableDefaultSort ? $scope.tableDefaultSort : null
        };

        $scope.$watch('filter', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            $scope.tableCollection = $filter('orderBy')($scope.tableCollection, $scope.filter.order_by, $scope.reverse);

            // TODO here you can add conditional calling to server if base-collection is provided
            // TODO Also callback method can be injected into scope
          }
        }, true);
      },
      controller: function($scope, $compile, $http) {
        this.sortTable = function (field) {
          $scope.reverse = !$scope.reverse;
          $scope.filter.direction = $scope.reverse ? 'desc' : 'asc';
          $scope.filter.order_by = field;
        };

        this.getOrderBy = function () {
          return $scope.filter.order_by;
        };

        this.getReverse = function () {
          return $scope.reverse;
        };
      }
    };
  })
  .directive('tableSortable', function() {
    return {
      restrict: 'A',
      transclude: true,
      templateUrl: 'directives/table-sortable.html',
      require: '^tableControl',
      scope: {},
      link: function($scope, element, attrs, tableControl) {
        $scope.sortTable = function () {
          tableControl.sortTable(attrs.tableSortable);
        };

        $scope.isSortedByThisColumn = function () {
          return tableControl.getOrderBy() == attrs.tableSortable;
        };

        $scope.getReverse = function () {
          return tableControl.getReverse();
        };
      }
    };
  });
