'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/edit', {templateUrl: 'partials/edit.html', controller: 'MyCtrl1'});
    $routeProvider.when('/view', {templateUrl: 'partials/viewPartial.html', controller: 'MyCtrl2'});
    $routeProvider.otherwise({redirectTo: '/edit'});
  }]);
