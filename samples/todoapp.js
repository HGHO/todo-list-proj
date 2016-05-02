(function(){
'use strict';
//angularModalService used for modal pages
//ngRoute used for routing
//storageService used for factory as a data storage
angular.module('todoapp', ['angularModalService','ngRoute','storageService'])
//This function handle the input path (ex.localhost:3000/#/show/2)
.config(function($routeProvider){
  $routeProvider.when('/show/:message',
  {
    templateUrl: 'show/show.html',
    controller: 'ShowCtrl'
  }
  ).when('/edit/:message',
  {
    templateUrl: 'edit/edit.html',
    controller: 'EditCtrl'
  }).
  otherwise({
    redirectTo: '/'
  });

})
// SampleController is the main controller of App
.controller('SampleController', ['$scope', 'getLocalStorage','$location','ModalService', function($scope, getLocalStorage,$location, ModalService) {
  //create local storage with calling getLocalStorage factory and get our todo list as todos
  $scope.todos = getLocalStorage.getTodos();
  //new inputs for the todos
  if($scope.todos.length < 1 ){
   $scope.todos.push({ title:'Mow lawn', note: 'Should be done by 13th may.'},
    { title:'Wash car', note: 'Use Mkuiars Wax!'},
    { title:'Buy groceries', note: 'Apples, Bananas and some tomatoes.'});
   //update the local storage with new inputs
   getLocalStorage.updateTodos($scope.todos);
 }

//This fuction adds new todo by clicking on Add button
$scope.addTodo = function() {

  $scope.todos.push({'title': $scope.newTodoTitle, 'note': $scope.newTodoNote});
  getLocalStorage.updateTodos($scope.todos);
  $scope.newTodoTitle = '';
  $scope.newTodoNote= '';
  
};

//This fuction remove selected todo by clicking on delete button
$scope.removeTodo = function (index) {
  $scope.todos.splice(index, 1);
  //update the local storage because of new changes
  getLocalStorage.updateTodos($scope.todos);
};

//show: calls from ShowCtrl when user give a path like localhost:3000/#/show/2 or by clicking on Show button
$scope.$on('show', function (event, data) {
  //It opens the show modal page
  ModalService.showModal({
    templateUrl: 'show/show.html',
    controller: 'ShowController',
    // inputs which used in ShowController to show selected todo
    inputs: {
      title: $scope.todos[data-1].title,
      note: $scope.todos[data-1].note
    }
  }).then(function(modal) {
    modal.element.modal();
    modal.close.then(function() {
      // change the path from localhost:3000/#/show/1 to localhost:3000/# after user close the modal window
      $location.path('/');
    });
  });
});

// //show: calls from EditCtrl when user give a path like localhost:3000/#/edit/2 or by clicking on Edit button
$scope.$on('edit', function (event, data) {
  //It opens the edit modal page
  ModalService.showModal({
    templateUrl: 'edit/edit.html',
    controller: 'EditController',
  // inputs which used in EditController to edit selected todo
  inputs: {
    modaltitle: 'Did you change your mind?',
    title: $scope.todos[data-1].title,
    note: $scope.todos[data-1].note
  }
}).then(function(modal) {
  modal.element.modal();
  modal.close.then(function(result) {
    // change the old todo to new edited todo
    $scope.todos[data-1].title = result.title;
    $scope.todos[data-1].note = result.note;
    //update the local storage because of new changes
    getLocalStorage.updateTodos($scope.todos);
    $location.path('/');

  });
});
});

}])
.controller('ShowCtrl',
  function SiblingOneCtrl ($scope,$routeParams) {
    var self = this;
    // takes the index of selected todo to use for showing
    self.message = $routeParams.message;
  $scope.$emit('show', self.message); // going up!

})
.controller('EditCtrl',
  function SiblingOneCtrl ($scope,$routeParams) {
    var self = this;
    // takes the index of selected todo to use for editing
    self.message = $routeParams.message;
  $scope.$emit('edit', self.message); // going up!

});

var storageService = angular.module('storageService', []);

// This factory plays role of data storage
storageService.factory('getLocalStorage', function() {
  
  var todoList = {};
  
  return {
    list: todoList,
    // update the local storage
    updateTodos: function (todosArr) {
      if (window.localStorage && todosArr) {
        localStorage.setItem('todos', angular.toJson(todosArr));
      }
            //update the cached version
            todoList = todosArr;
          },
          // get the todo list
          getTodos: function () {
            todoList = angular.fromJson( localStorage.getItem('todos') );
            return todoList ? todoList : [];
          }
        };
        
      });
})();
