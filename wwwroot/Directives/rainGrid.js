(function (app) {
    app.directive('rainGrid', function () {

        return {

            restrict: 'AE',
            templateUrl: 'wwwroot/Directives/rainGrid.html',
            replace: false,
            scope: {
                rainGrid: '='
            },
            link: function ($scope, $element, attr) {

            },
            controller: function ($scope) {
                initPage();
                var gridOptions = $scope.rainGrid;
                var gridData = getGridData(gridOptions);
                var dataList = gridData.data;
                $scope.header = gridData.header;
                $scope.rowCount = dataList.length;
                getPageData();

                $scope.pageSizeChanged = function (pageSize) {
                    $scope.currentPage = 1;
                    getPageData();
                };
                $scope.pageChanged = function () {
                    getPageData();
                };

                function initPage() {
                    $scope.currentPage = 1;
                    $scope.maxSize = 3;
                    $scope.pageSizes = [
                        {label: ' 5', value: 5},
                        {label: '10', value: 10},
                        {label: '20', value: 20}
                    ];
                    $scope.pageSize = $scope.pageSizes[0];
                }

                function getPageData() {
                    $scope.list = getDataListByPage(dataList, $scope.currentPage, $scope.pageSize.value);
                }
            }

        };

        function getGridData(gridOptions) {
            var list = gridOptions.data;
            var columnDefs = gridOptions.columnDefs;

            var gridList = {};
            gridList.data = _.map(list, function (value) {
                var row = [];
                if (!columnDefs) {
                    for (var property in value) {
                        if (value.hasOwnProperty(property)) {
                            row.push({fieldName: property, value: value[property], displayName: property});
                        }
                    }
                } else {
                    angular.forEach(columnDefs, function (col) {
                        row.push({fieldName: col.field, value: value[col.field], displayName: col.displayName});
                    });
                }
                return row;
            });
            var firstRow = gridList.data[0];
            if (firstRow) {
                gridList.header = firstRow;
            }
            return gridList;
        }

        function getDataListByPage(data, page, pageSize, sortField, sortOrder) {
            // page starts with 1
            if (!data || page <= 0) {
                return null;
            }
            try {
                var start = (page - 1) * pageSize;
                var pagedData = _.slice(data, start, start + pageSize);
                if (!pagedData) {
                    return null;
                }
                return pagedData;
            } catch (e) {
                console.log(e.message);
                return null;
            }
        }

    });
})(angular.module('appNorthwind'));