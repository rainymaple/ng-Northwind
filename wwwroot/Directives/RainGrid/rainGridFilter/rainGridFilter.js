(function (app) {
    app.directive('fieldSelect', ['rainGridService', fieldSelect]);

    /*-- Function Directive --*/
    function fieldSelect() {
        return {
            restrict: 'AE',
            template: template(),
            replace: false,
            controller: controller

        };
        function controller($scope) {
            var aa = $scope.columnDefs;
        }

        function template() {
            return '<select class="form-control input-sm" ng-model="col" ' +
                'ng-options="colDef as colDef.label for colDef in columns';
                /*'ng-options="colDef.field as colDef.displayName for colDef in columnDefs"> </select>';*/
        }
    }   // end of fieldSelect
})(angular.module('appNorthwind'));
