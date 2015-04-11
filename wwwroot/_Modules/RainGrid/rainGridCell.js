(function (app) {
    app.directive('gridCellTemplate', ['$parse', gridCellTemplate]);

    /*-- Function Directive --*/
    function gridCellTemplate() {

        return {
            restrict: 'AE',
            templateUrl: 'wwwroot/_Modules/RainGrid/rainGridCell.html',
            replace: false,
            scope: {
                gridCellTemplate: '=',
                isDate: '=',
                isCurrency: '=',
                isNumber: '=',
                isCheckbox: '=',
                isLink: '=',
                isHidden: '=',
                decimal:'=',
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
})(angular.module('rainGrid'));