(function(){
	'use strict';
var app = angular.module('todoapp');

// This controller takes value of selected todo to show in modal
app.controller('ShowController', [
	'$scope','title','note','close', 
	function($scope,title, note, close) {

		$scope.title = title;
		$scope.note = note;
		
  // function to close modal window
  $scope.close = function() {
 	  close({}, 500); // close, but give 500ms for bootstrap to animate
 	};


 }]);
})();