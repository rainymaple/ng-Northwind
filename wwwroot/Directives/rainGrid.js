(function (app) {
    app.directive('rainGrid', ['$timeout', rainGrid]);

    /*-- Function Directive --*/
    function rainGrid() {
        var _gridOptions = {};
        var _dataList = [];
        var _sortings = [null, 'ASC', 'DSC'];
        var _sortOrder = 0;
        var _sortField = null;

        return {
            restrict: 'AE',
            templateUrl: 'wwwroot/Directives/rainGrid.html',
            replace: false,
            scope: {
                rainGrid: '=',
                funcDetail: '&'
            },
            controller: controller

        };

        /*-- Function Controller --*/

        function controller($scope) {

            activate();

            // controller functions

            function activate() {
                _gridOptions = {enablePage: true, pageSize: 10};
                _gridOptions = _.assign(_gridOptions, $scope.rainGrid);
                _gridOptions.data.then(
                    function(dataList){
                        _gridOptions.dataList = dataList;
                        var gridData = getGridData(_gridOptions);
                        initPage();
                        initData(gridData);
                    }
                )
            }

            function initPage() {
                $scope.enablePage = _gridOptions.enablePage;
                $scope.currentPage = 1;
                $scope.maxSize = 3;
                $scope.pageSizes = [
                    {label: ' 5', value: 5},
                    {label: '10', value: 10},
                    {label: '20', value: 20}
                ];
                $scope.pageSize = $scope.pageSizes[1];
                if (_gridOptions.pageSize) {
                    var pageSize = _.find($scope.pageSizes, function (size) {
                        return size.value == _gridOptions.pageSize;
                    });
                    if (pageSize) {
                        $scope.pageSize = pageSize;
                    }
                }

            }

            function initData(gridData) {
                _dataList = gridData.data;
                $scope.header = gridData.header;
                $scope.rowCount = _dataList.length;
                $scope.enablePage = _gridOptions.enablePage && ($scope.rowCount > $scope.pageSizes[0].value);
                getPageData();
            }

            function getPageData() {
                if (!$scope.enablePage) {
                    $scope.list = _dataList;
                    return $scope.list;
                }
                var pagedDataList = getDataListByPage(_dataList, $scope.currentPage, $scope.pageSize.value);
                if (pagedDataList) {
                    $scope.list = pagedDataList;
                }
                return $scope.list;
            }

            // page event handlers

            $scope.gotoDetail = function (id) {
                if (!id) {
                    throw "gridOptions.idField is missing or invalid";
                }
                $scope.funcDetail({'id': id});
            };

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

        /*--  Directive Functions --*/

        // Building the header and rows
        function getGridData(gridOptions) {
            var list = gridOptions.dataList;
            var columnDefs = gridOptions.columnDefs;

            var gridList = {};
            gridList.data = _.map(list, function (rowData) {
                var newRow = [];
                if (!columnDefs) {
                    for (var property in rowData) {
                        if (rowData.hasOwnProperty(property)) {
                            newRow.push(
                                {
                                    fieldName: property,
                                    value: rowData[property],
                                    displayName: property
                                });
                        }
                    }
                } else {
                    angular.forEach(columnDefs, function (col) {
                        newRow.push({
                            id: rowData[gridOptions.idField],
                            fieldName: col.field,
                            value: rowData[col.field],
                            displayName: col.displayName,
                            isCheckbox: col.isCheckbox,
                            isDetailLink: col.isDetailLink
                        });
                    });
                }
                return newRow;
            });
            var firstRow = gridList.data[0];
            if (firstRow) {
                gridList.header = firstRow;
            }
            return gridList;
        }

        // Paging
        function getDataListByPage(data, page, pageSize) {
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


    }
})(angular.module('appNorthwind'));