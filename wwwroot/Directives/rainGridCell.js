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
                isSelector: '=',
                isCurrency: '=',
                isNumber: '=',
                isCheckbox: '=',
                isLink: '=',
                funcLink: '&'
            },
            link: link

        };

        function link(scope, el, attr) {
            scope.value = scope.gridCellTemplate;
            if (scope.isLink) {
                scope.linkFunc = function () {
                    scope.funcLink();
                }

            }
        }


    }
})(angular.module('appNorthwind'));