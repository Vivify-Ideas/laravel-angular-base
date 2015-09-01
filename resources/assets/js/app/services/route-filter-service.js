_app.factory('RouteFilterService', function($rootScope, $state, activeUser) {
    var goToState = function (state, event) {
      $rootScope.pageBusy = false;
      $state.go(state);
      return event.preventDefault();
    };

    var filterRoute = function(filter, event) {
      if(filter === 'guest' && activeUser.id) {
        return goToState('my-profile', event);
      } 
      if(filter === 'authenticated' && !activeUser.id){
        return goToState('login', event);
      }
    };

    $rootScope.$on('$stateChangeStart', function(event, toState) {
      $rootScope.pageBusy = true;

      if(toState.filter) {
        return filterRoute(toState.filter, event);
      }
    });

  return true;
});
