'use strict';

myApp.controller('EditController',
    function EditController($scope, $http) {


        var schema = null

        //--invoke setup
        setup();

        //----------------------- Functions defined in the UI -----------------------//

        //-- Add row
        $scope.addRow = function () {
            $scope.editRows.push(new Object({"name": "name", "type": "string", "desc": "Description associated with the field"}));
        };

        //-- Remove row
        $scope.removeRow = function ($index) {
            $scope.editRows.splice($index, 1);
        };


        //-- Submit function
        $scope.submit = function () {

            function generateSchema(element, index, array) {
                schema.fields.push({"name": element['name'], "type": element['type']})
            };

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

        }


    });
