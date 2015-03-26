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
                isDetailLink: '=',
                funcDetail: '&'
            },
            link: link

        };

        function link(scope, el, attr) {
            scope.value = scope.gridCellTemplate;
            if (scope.isDetailLink) {
                scope.linkFunc = function () {
                    scope.funcDetail();
                }

            }
        }


    }
})(angular.module('appNorthwind'));