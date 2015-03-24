(function (app) {
    app.directive('rainGrid', function () {

        var _dataList = [];
        var _sortings = [null, 'ASC', 'DSC'];
        var _sortOrder = 0;
        var _sortField = null;

        return {

            restrict: 'AE',
            templateUrl: 'wwwroot/Directives/rainGrid.html',
            replace: false,
            scope: {
                rainGrid: '='
            },
            controller: function ($scope, $timeout) {

                activate();

                // controller functions

                function activate() {
                    initPage();
                    var gridOptions = $scope.rainGrid;
                    /* using $timeout here is to make sure getting data before rendering the html*/
                    $timeout(function () {
                        return getGridData(gridOptions)
                    }).then(function (gridData) {
                        _dataList = gridData.data;
                        $scope.header = gridData.header;
                        $scope.rowCount = _dataList.length;
                        getPageData();
                    });
                }

                function initPage() {
                    $scope.currentPage = 1;
                    $scope.maxSize = 3;
                    $scope.pageSizes = [
                        {label: ' 5', value: 5},
                        {label: '10', value: 10},
                        {label: '20', value: 20}
                    ];
                    $scope.pageSize = $scope.pageSizes[1];
                }

                function getPageData() {
                    var pagedDataList = getDataListByPage(_dataList, $scope.currentPage, $scope.pageSize.value);
                    if (pagedDataList) {
                        $scope.list = pagedDataList;
                    }
                    return $scope.list;
                }

                // page event handlers
                $scope.pageSizeChanged = function (pageSize) {
                    $scope.currentPage = 1;
                    getPageData();
                };
                $scope.pageChanged = function () {
                    getPageData();
                };

                $scope.setSorting = function (sortField) {
                    if (_sortField !== sortField) {
                        _sortOrder = 1;
                    } else {
                        _sortOrder = _sortOrder + 1;
                        if (_sortOrder > 2) {
                            _sortOrder = 0;
                        }
                    }
                    _sortField = sortField;
                    $scope.sortField = sortField;
                    $scope.sortOrder = _sortings[_sortOrder];
                    getPageData();
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
                            row.push(
                                {
                                    fieldName: property,
                                    value: value[property],
                                    displayName: property
                                });
                        }
                    }
                } else {
                    angular.forEach(columnDefs, function (col) {
                        row.push({
                            fieldName: col.field,
                            value:  value[col.field],
                            displayName: col.displayName
                        });
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
                data = sortData(data, 'ProductName', true);

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

        // Sorting
        function sortData(data) {
            var sortOrder = _sortings[_sortOrder];
            if (!_sortField || !sortOrder) {
                return data;
            }
            var sortedData = _.sortBy(data, function (row) {
                var sortedValue = null;
                for (var i = 0; i < row.length; i++) {
                    if (row[i].fieldName === _sortField) {
                        sortedValue = row[i].value;
                        return sortedValue;
                    }
                }
            });
            return sortOrder === _sortings[1] ? sortedData : sortedData.reverse();
        }


    });
})(angular.module('appNorthwind'));