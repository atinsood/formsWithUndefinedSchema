'use strict';

/* Controllers */
/*
 angular.module('myApp.controllers', []).
 controller('MyCtrl1', [function ($scope) {
 $scope.editRows = [
 {"name": "name", "type": "string", "desc": "Description associated with the field"},
 {"name": "favorite_number", "type": ["int", "null"]},
 {"name": "favorite_color", "type": ["string", "null"]}
 ]

 }])
 .controller('MyCtrl2', [function () {

 }]);
 */

angular.module('myApp.controllers', [])

function MyCtrl1($scope, $http) {

    $http.get("json/dataType.json").success(function (data) {
        $scope.dataTypes = data
        console.log(data)

    })
    $scope.editRows = [
        {"name": "name", "type": "string", "desc": "Description associated with the field"}
    ]
}