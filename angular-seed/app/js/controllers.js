'use strict';

/* Controllers */
//FIXME Need to fix the scope of controllers and take care of minification
angular.module('myApp.controllers', [])

function MyCtrl1($scope, $http) {

    //--Avro schema
    var schema = new Object({"namespace": "com.b2b.ui.dynamic",
        "type": "record",
        "name": "",
        "fields": []
    })

    //-- Added a default row in UI
    $scope.editRows = []
    $scope.editRows.push(new Object({"name": "name", "type": "string", "desc": "Description associated with the field"}))

    //-- Request to get data types
    $http.get("json/dataType.json").success(function (data) {
        $scope.dataTypes = data

    })

    //-- Add row
    $scope.addRow = function () {
        $scope.editRows.push(new Object({"name": "name", "type": "string", "desc": "Description associated with the field"}))
    }

    //-- Remove row
    $scope.removeRow = function () {
        $scope.editRows.pop() //FIXME currently always deleting the last element
    }


    //TODO Temp function that needs to be cleaned up
    $scope.show = function () {
        console.log($scope.editRows)
    }

    //-- Submit function
    $scope.submit = function () {

        function generateSchema(element, index, array) {
            schema.fields.push({"name": element['name'], "type": element['type']})
        }

        $scope.editRows.forEach(generateSchema)
        schema['name'] = $scope.recordName
        console.log(schema)

        //Now submit it to a backend
        $http.post('http://localhost:8888/dynamicUI',schema).success(function(){console.log('successfully posted')})
    }

}

