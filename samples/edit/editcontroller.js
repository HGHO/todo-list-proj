(function(){
  'use strict';
var app = angular.module('todoapp');
// This controller takes value of selected todo to edit in modal
app.controller('EditController', [
  '$scope', '$element', 'modaltitle','title','note','close', 
  function($scope, $element, modaltitle,title, note, close) {

    $scope.title = title;
    $scope.note = note;
    $scope.modaltitle = modaltitle;

  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
    close({
      title: $scope.title,
      note: $scope.note
    }, 500); // close, but give 500ms for bootstrap to animate
  };

  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {

    //  Manually hide the modal.
    $element.modal('hide');
    
    //  Now call close, returning control to the caller.
    close({
      title: title,
      note: note
    }, 500); // close, but give 500ms for bootstrap to animate
  };

}]);
})();