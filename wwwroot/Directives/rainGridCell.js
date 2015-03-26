(function (app) {
    app.directive('gridCellTemplate', ['$parse', gridCellTemplate]);

    /*-- Function Directive --*/
    function gridCellTemplate() {

        return {
            restrict: 'AE',
            templateUrl: 'wwwroot/Directives/rainGridCell.html',
            replace: false,
            scope: {
                gridCellTemplate: '=',
                isCheckbox: '=',
                linkFuncById: '='
            },
            link: link

        };

        function link(scope, el, attr) {
            scope.value = scope.gridCellTemplate;
            var linkFuncById = $parse(scope.linkFuncById + '(' + 9 + ')');
        }


    }
})(angular.module('appNorthwind'));