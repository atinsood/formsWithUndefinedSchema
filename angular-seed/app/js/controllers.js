'use strict';

/* Controllers */
//FIXME Need to fix the scope of controllers and take care of minification
angular.module('myApp.controllers', [])

function MyCtrl1($scope, $http) {

    var schema = null

    //--invoke setup
    setup();

    //-- Add row
    $scope.addRow = function () {
        $scope.editRows.push(new Object({"name": "name", "type": "string", "desc": "Description associated with the field"}));
    };

    //-- Remove row
    $scope.removeRow = function ($index) {
        $scope.editRows.splice($index, 1);
    };


    //TODO Temp function that needs to be cleaned up
    $scope.show = function () {
        console.log($scope.editRows);
    };

    //-- Submit function
    $scope.submit = function () {

        function generateSchema(element, index, array) {
            schema.fields.push({"name": element['name'], "type": element['type']})
        };

        console.log("Even I get called for no reasons")

        $scope.editRows.forEach(generateSchema)
        schema['name'] = $scope.recordName

        console.log(schema)

        //Now submit it to a backend
        $http.post('http://localhost:8888/dynamicUI', schema).success(function () {
            console.log('successfully posted')
            setup();
        })
    };


    //-- FUNCTIONS --
    function setup() {
        //--Avro schema
        schema = new Object({"namespace": "com.b2b.ui.dynamic",
            "type": "record",
            "name": "",
            "fields": []
        })

        $scope.recordName = "";
        //-- Added a default row in UI
        $scope.editRows = []
        $scope.editRows.push(new Object({"name": "name", "type": "string", "desc": "Description associated with the field"}))

        //-- Request to get data types
        $http.get("json/dataType.json").success(function (data) {
            $scope.dataTypes = data
        })

        //Request to get user created data types
        $http.get('http://localhost:8888/dynamicUI').success(function (data) {

            data.forEach(function (element, index, array) {
                $scope.dataTypes.push(element['name'])
            })


        })

    }

}

function MyCtrl2($scope, $http) {

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
}


