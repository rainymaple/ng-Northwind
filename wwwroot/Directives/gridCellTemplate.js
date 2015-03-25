(function (app) {
    app.directive('gridCellTemplate', ['$timeout', gridCellTemplate]);

    /*-- Function Directive --*/
    function gridCellTemplate($timeout) {
        var _gridOptions = {};
        var _dataList = [];
        var _sortings = [null, 'ASC', 'DSC'];
        var _sortOrder = 0;
        var _sortField = null;

        return {
            restrict: 'AE',
            templateUrl: 'wwwroot/Directives/gridCellTemplate.html',
            replace: false,
            scope: {
                gridCellTemplate: '=',
                template: '='
            },
            link: link

        };

        function link(scope, el, attr) {
            scope.value = scope.gridCellTemplate;
            scope.isCheckbox = scope.template;
        }


    }
})(angular.module('appNorthwind'));