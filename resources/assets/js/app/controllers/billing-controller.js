_app.controller('BillingCtrl', function($scope, card, stripe, $state, FlashMessagesService){

  $scope.card = card;
  $scope.error = '';
  $scope.busy = false;
  $scope.cardInfo = {
    number: '',
    cvc: '',
    exp_month: '',
    exp_year: ''
  };

  $scope.save = function(cardInfo) {
    $scope.error = '';
    $scope.busy = true;

    stripe.card.createToken(cardInfo)
      .then(function (token) {
        $scope.card.token = token.id;

        $scope.card.save(function () {
          // $state.go('billing');
          FlashMessagesService.success('Payment details successfully updated');
        }, function () {
          $scope.busy = false;
        });
      })
      .catch(function (err) {
        $scope.busy = false;
        $scope.error = err.message;
      });
  }

});