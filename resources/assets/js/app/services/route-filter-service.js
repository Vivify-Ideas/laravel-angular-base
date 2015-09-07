_app.factory('RouteFilterService', function($rootScope, $state, AuthService) {
    var goToState = function (state, event) {
      $rootScope.pageBusy = false;
      $state.go(state);
      return event.preventDefault();
    };

    var filterRoute = function(toState, event) {
      if(toState.filter === 'guest' && AuthService.check()) {
        return goToState('my-profile', event);
      } 
      if(toState.filter === 'authenticated') {
        if(!AuthService.check()) {
          return goToState('login', event);
        }

        if(!AuthService.user.stripe_plan && toState.name !== 'change-plan'){
          return goToState('change-plan', event);
        }
      }

    };

    $rootScope.$on('$stateChangeStart', function(event, toState) {
      $rootScope.pageBusy = true;

      if(toState.filter) {
        return filterRoute(toState, event);
      }
    });

  return true;
});
