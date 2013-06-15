'use strict';

myApp.controller('ViewController', function ViewController($scope, $http) {

    $http.get('http://localhost:8888/dynamicUI').success(function (data) {

            //add an index to each element so that its easy to look it up back in array
            data.forEach(function (element, index, array) {
                element['index'] = index
            })
            $scope.schemas = data
        }
    );


    $scope.go = function () {
        $http.get('http://localhost:8888/dynamicUI').success(function (data) {

                var schema = data[$scope.schemaName['index']]

                //clean up the table showing the form and then repopulate it
                $scope.rows = [];
                schema['fields'].forEach(generateUI);

                function generateUI(element, index, array) {
                    $scope.rows.push(new Object({'name': element['name'], 'value': ""}));

                }

            }
        );
    }


    $scope.submit = function () {
    }
})
