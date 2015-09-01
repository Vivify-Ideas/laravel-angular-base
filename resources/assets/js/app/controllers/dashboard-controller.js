_app.controller('DashboardCtrl', function($scope, FlashMessagesService, $timeout, dialogs, $rootScope) {

    $scope.isSpinning = false;
    $scope.showSpinner = function() {
      // stop loading
      $scope.isSpinning = true;
      $timeout(function(){
        $scope.isSpinning = false;
      }, 3000);
    };

    //Flash messages
    $timeout(function () {
      FlashMessagesService.success('Hello there !!');
    }, 1000);

    $timeout(function () {
      FlashMessagesService.danger('I\'m a flash message');
    }, 2000);

    $timeout(function () {
      FlashMessagesService.info('Me too!');
    }, 2500);

    $timeout(function () {
      FlashMessagesService.warning('Ooooh Yeaaah!');
    }, 5000);
      //end Flash messages

    //Dialogs
    var _progress = 33;

    $scope.launch = function(which){
      switch(which){
        case 'error':
          dialogs.error();
          break;
        case 'wait':
          var dlg = dialogs.wait(undefined,undefined,_progress);
          _fakeWaitProgress();
          break;
        case 'customwait':
          var dlg = dialogs.wait('Custom Wait Header','Custom Wait Message',_progress);
          _fakeWaitProgress();
          break;
        case 'notify':
          dialogs.notify();
          break;
        case 'confirm':
          var dlg = dialogs.confirm();
          dlg.result.then(function(btn){
              $scope.confirmed = 'You confirmed "Yes."';
          },function(btn){
              $scope.confirmed = 'You confirmed "No."';
          });
          break;
      }
    };

    var _fakeWaitProgress = function(){
      $timeout(function(){
        if(_progress < 100){
          _progress += 33;
          $rootScope.$broadcast('dialogs.wait.progress',{'progress' : _progress});
          _fakeWaitProgress();
        }else{
          $rootScope.$broadcast('dialogs.wait.complete');
          _progress = 33;
        }
      },1000);
    }; // end Dialogs


    /// Table example
    $scope.tableData = [
      {name: "Dejo", age: 47},
      {name: "Piksi", age: 55},
      {name: "Mijat", age: 43}
    ];
  }
);