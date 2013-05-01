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

    $scope.editRows = []
    $scope.editRows.push(new Object({"name": "name", "type": "string", "desc": "Description associated with the field"}))

    $http.get("json/dataType.json").success(function (data) {
        $scope.dataTypes = data

    })


    $scope.addRow = function () {
        $scope.editRows.push(new Object({"name": "name", "type": "string", "desc": "Description associated with the field"}))
    }

    $scope.removeRow = function () {
        $scope.editRows.pop() //FIXME currently always deleting the last element
    }

    //TODO Temp fucntion that needs to be cleaned up
    $scope.show = function () {
        console.log($scope.editRows)
    }
}

