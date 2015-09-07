_app.controller('BillingCtrl', function($scope, card, stripe, invoices, FlashMessagesService){

  $scope.card = card;
  $scope.invoices = invoices;

  $scope.error = '';
  $scope.busy = false;
  $scope.shouldShowChangeCCForm = false;

  $scope.save = function(cardInfo) {
    $scope.error = '';
    $scope.busy = true;

    stripe.card.createToken(cardInfo)
      .then(function (token) {
        $scope.card.token = token.id;

        $scope.card.save(function () {
          FlashMessagesService.success('Payment details successfully updated');
          $scope.busy = false;
          $scope.shouldShowChangeCCForm = false;
        }, function () {
          $scope.busy = false;
        });
      })
      .catch(function (err) {
        $scope.busy = false;
        $scope.error = err.message;
      });
  }

  $scope.showChangeCCForm = function(shouldShow) {
     $scope.cardInfo = {
      number: '',
      cvc: '',
      exp_month: '',
      exp_year: ''
    };
    $scope.shouldShowChangeCCForm = shouldShow;
  }

});