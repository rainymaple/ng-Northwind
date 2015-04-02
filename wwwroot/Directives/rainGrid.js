/*
    gridOptions = {
        data: promiseData,
        columnDefs: getColumnDefs(),
        enablePage: true,
        idField: 'CategoryID',
        pageSize: 10,
        selectable: false,
        selectFirstRow: false,
        title: 'Categories'
    };
    function getColumnDefs() {
        return [
            {
                field: 'CategoryID',
                displayName: 'Id'
            },
            {
                field: 'CategoryName',
                displayName: 'Name',
                isLink: false,
                isCurrency: false,
                isNumber: false,
                isCheckbox: false,
                isDate: false,
                isHidden: false,
                linkFunc: {funcName: 'employeeDetail', funcIdField: 'EmployeeID'}
            }
        ]
     // function attributes
         func-link,
         funk-on-select

 }*/


(function (app) {
    app.directive('rainGrid', ['$timeout','rainGridService', rainGrid]);

    /*-- Function Directive --*/
    function rainGrid() {

        return {
            restrict: 'AE',
            templateUrl: 'wwwroot/Directives/rainGrid.html',
            replace: false,
            scope: {
                rainGrid: '=',
                funcLink: '&',
                funcOnSelect: '&'
            },
            controller: controller

        };

        /*-- Function Controller --*/

        function controller($scope,rainGridService) {

            $scope.gridOptions = {};
            var _dataList =[];
            var _dataRows =[];
            var _sortings = [null, 'ASC', 'DSC'];
            var _sortOrder = 0;
            var _sortField = null;

            $scope.$watch('rainGrid.data', function () {
                activate();
            });

            activate();

            // controller functions

            function activate() {
                buildGridOptions();
                //Pace.restart();
                $scope.gridOptions.data.then(
                    function (dataList) {
                        $scope.gridOptions.dataList = dataList;
                        $scope.gridData = getGridData($scope.gridOptions);
                        initPage();
                        initData($scope.gridData);
                        rainGridService.modifyPaginationIcons();
                        //cfpLoadingBar.complete();
                        //Pace.stop();

                    }
                )
            }

            function buildGridOptions() {
                $scope.gridOptions = {enablePage: true, pageSize: 10, selectable: false};
                $scope.gridOptions = _.assign($scope.gridOptions, $scope.rainGrid);
                $scope.selectable = $scope.gridOptions.selectable;
                $scope.title = $scope.gridOptions.title;
            }

            function initPage() {
                $scope.enablePage = $scope.gridOptions.enablePage;
                $scope.currentPage = 1;
                $scope.maxSize = 3;
                $scope.pageSizes = [
                    {label: ' 5', value: 5},
                    {label: '10', value: 10},
                    {label: '20', value: 20}
                ];
                $scope.pageSize = $scope.pageSizes[1];
                if ($scope.gridOptions.pageSize) {
                    var pageSize = _.find($scope.pageSizes, function (size) {
                        return size.value == $scope.gridOptions.pageSize;
                    });
                    if (pageSize) {
                        $scope.pageSize = pageSize;
                    }
                }

            }

            function initData(gridData,filters) {

                $scope.currentPage = 1;
                _sortOrder = 0;
                _sortField = null;

                _dataRows = gridData.rows;
                if(filters){
                    _dataRows = rainGridService.filterData(_dataRows,filters);
                }
                $scope.header = gridData.header;
                $scope.rowCount = _dataRows.length;
                $scope.enablePage = $scope.gridOptions.enablePage && ($scope.rowCount > $scope.pageSizes[0].value);

                // _dataRows is original and unsorted, _dataList is sorted;
                _dataList = _dataRows;
                getPageData(_dataList);
            }

            function getPageData(dataList) {
                if (!$scope.enablePage) {
                    $scope.list = dataList;
                    return $scope.list;
                }
                var pagedDataList = rainGridService.getDataListByPage(dataList, $scope.currentPage, $scope.pageSize.value);

                if (pagedDataList) {
                    $scope.list = pagedDataList;
                    angular.forEach($scope.list, function (row) {
                        if (row.rowSelected) {
                            if (row != $scope.selectedRow) {
                                row.rowSelected = false;
                            }
                        }
                    })
                }
                return $scope.list;
            }

            // page event handlers

            $scope.linkTo = function (row, funcName, funcIdField) {
                /*if (!id) {
                 throw "gridOptions.idField is missing or invalid";
                 }*/
                var params ={'row': row, 'funcName': funcName, 'funcIdField': funcIdField};
                $scope.funcLink({params:params});
            };

            $scope.pageSizeChanged = function (pageSize) {
                $scope.currentPage = 1;
                getPageData(_dataList);
            };

            $scope.pageChanged = function () {
                getPageData(_dataList);
            };

            $scope.sortingChanged = function (sortField) {
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
                _dataList = sortData(_dataRows);
                getPageData(_dataList);
            };

            $scope.selectRow = function (row) {
                if (!$scope.selectable) {
                    return;
                }
                var isSelected = row.rowSelected;
                angular.forEach($scope.list, function (row) {
                    row.rowSelected = false;
                });
                row.rowSelected = !isSelected;
                if (row.rowSelected) {
                    $scope.selectedRow = row;
                }
                if (row.rowSelected && $scope.funcOnSelect) {
                    $scope.funcOnSelect({id: row.id});
                }
            };

            // Sorting
            function sortData(dataList) {
                var sortOrder = _sortings[_sortOrder];
                if (!_sortField || !sortOrder) {
                    return dataList;
                }
                var sortedData = _.sortBy(dataList, function (row) {
                    var rowData = row.rowData;
                    var sortedValue = null;
                    for (var i = 0; i < rowData.length; i++) {
                        if (rowData[i].fieldName === _sortField) {
                            sortedValue = rowData[i].value;
                            return sortedValue;
                        }
                    }
                });
                return sortOrder === _sortings[1] ? sortedData : sortedData.reverse();
            }   // end of sortData


            // Building the header and rows
            function getGridData(gridOptions) {
                var list = gridOptions.dataList;
                var columnDefs = gridOptions.columnDefs;
                var idField = null;
                var id = null;


                var gridList = {rows: [], header: buildHeader(columnDefs)};
                if (list.length == 0) {
                    return gridList;
                }
                gridList.rows = _.map(list, function (rowData) {
                    var row = [];
                    if (!columnDefs) {
                        for (var property in rowData) {
                            if (rowData.hasOwnProperty(property)) {
                                row.push(
                                    {
                                        fieldName: property,
                                        value: rowData[property],
                                        displayName: property
                                    });
                            }
                        }
                    } else {
                        idField = gridOptions.idField;
                        if (idField) {
                            id = rowData[gridOptions.idField];
                        }
                        angular.forEach(columnDefs, function (col) {
                            row.push({
                                id: rowData[gridOptions.idField],
                                fieldName: col.field,
                                value: rowData[col.field],
                                displayName: col.displayName,
                                isCheckbox: col.isCheckbox,
                                isCurrency: col.isCurrency,
                                isNumber: col.isNumber,
                                decimal: col.decimal,
                                isLink: col.isLink,
                                isDate: col.isDate,
                                isHidden: col.isHidden || false,
                                linkFunc: col.linkFunc || {funcName: '', funcIdField: ''}
                            });
                        });
                    }
                    return {rowData: row, rowSelected: false, idField: idField, id: id};
                });
                if (gridOptions.selectFirstRow && gridList.rows.length > 0) {
                    gridList.rows[0].rowSelected = true;
                    $scope.selectedRow = gridList.rows[0];
                }

                return gridList;
            }   // end of getGridData


        }   // end of controller

        /*--  Directive Functions --*/
        function buildHeader(columnDefs) {
            var row = [];
            angular.forEach(columnDefs, function (col) {
                row.push({
                    fieldName: col.field,
                    displayName: col.displayName,
                    isHidden: col.isHidden
                });
            });
            return row;
        }


    }   // end of rainGrid
})(angular.module('appNorthwind'));