'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', []);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/edit', {templateUrl: 'partials/edit.html', controller: 'EditController'});
    $routeProvider.when('/view', {templateUrl: 'partials/viewPartial.html', controller: 'ViewController'});
    $routeProvider.otherwise({redirectTo: '/edit'});
}]);
