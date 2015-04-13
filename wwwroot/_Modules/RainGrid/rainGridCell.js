(function (app) {
    app.directive('gridCellTemplate', ['rainGridService', gridCellTemplate]);

    /*-- Function Directive --*/
    function gridCellTemplate(rainGridService) {

        return {
            restrict: 'AE',
            templateUrl: rainGridService.baseUrl + 'rainGridCell.html',
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