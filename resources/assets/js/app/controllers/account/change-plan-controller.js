_app.controller('ChangePlanCtrl', function($scope, user, plans, card, dialogs, FlashMessagesService) {
    $scope.plans = plans;
    $scope.user = user;

    var updatePlan = function(plan, token) {
      plan.busy = true;
      $scope.user.changePlan(plan, token, function () {
        plan.busy = false;
        if(!card.id) {
          card.$get({id: 0, user_id: user.id});
        }
        FlashMessagesService.success('Your plan has been changed successfully.');
      });
    };

    $scope.switchPlan = function (plan) {
      if (!card.id && plan.price > 0) {
        window.StripeCheckout.open({
          key:         window._mb_data.stripePublishableKey,
          description: 'Monthly Subscription',
          panelLabel:  'Checkout',
          token:       function (token) {
            updatePlan(plan, token.id);
          }
        });
      } else {
        dialogs.confirm('Change Plan Confirmation', 'Are you sure want to switch to ' + plan.name + ' plan?')
          .result.then(function(btn) {
            updatePlan(plan);
          });
      }
    };

    $scope.cancelPlan = function (plan) {
      dialogs.confirm('Cancel Plan Confirmation', 'Are you sure want to cancel ' + plan.name + ' plan? Your plan will be updated to ' + $scope.plans.getFreePlan().name + '.')
        .result.then(function(btn) {
          plan.busy = true;
          $scope.user.cancelPlan(function () {
            plan.busy = false;
            if(!card.id) {
              card.$get({id: 0, user_id: user.id});
            }
            FlashMessagesService.success('Your plan has been changed successfully.');
          });
        });
    };
  });
