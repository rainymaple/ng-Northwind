/*
 gridOptions= {
 data: promiseData,
 columnDefs: getColumnDefs(),
 enablePage: true,
 idField: 'CategoryID',
 pageSize: 10,
 selectable: false,
 selectFirstRow: false,
 title : 'Categories'
 };
 function getColumnDefs(){
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
 isHidden: false
 }
 ]
 }
 // function attributes
 func-link,
 funk-on-select

 * */

(function (app) {
    app.directive('rainGrid', ['$timeout', rainGrid]);

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

        function controller($scope) {

            var _gridOptions = {};
            var _dataList = [];
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
                _gridOptions.data.then(
                    function (dataList) {
                        _gridOptions.dataList = dataList;
                        var gridData = getGridData(_gridOptions);
                        initPage();
                        initData(gridData);
                        //cfpLoadingBar.complete();
                        //Pace.stop();
                    }
                )
            }

            function buildGridOptions() {
                _gridOptions = {enablePage: true, pageSize: 10, selectable: false};
                _gridOptions = _.assign(_gridOptions, $scope.rainGrid);
                $scope.selectable = _gridOptions.selectable;
                $scope.title = _gridOptions.title;
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
                _dataList = gridData.rows;
                $scope.header = gridData.header;
                $scope.rowCount = _dataList.length;
                $scope.enablePage = _gridOptions.enablePage && ($scope.rowCount > $scope.pageSizes[0].value);
                getPageData();
            }

            function getPageData() {
                if (!$scope.enablePage) {
                    $scope.list = sortData(_dataList);
                    return $scope.list;
                }
                var pagedDataList = getDataListByPage(_dataList, $scope.currentPage, $scope.pageSize.value);
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

            $scope.linkTo = function (row,funcName,funcIdField) {
                /*if (!id) {
                    throw "gridOptions.idField is missing or invalid";
                }*/
                $scope.funcLink({'row': row,'funcName':funcName,'funcIdField':funcIdField});
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
                                isHidden: col.isHidden||false,
                                linkFunc: col.linkFunc||{funcName:'',funcIdField:''}
                            });
                        });
                    }
                    return {rowData: row, rowSelected: false, idField: idField, id: id};
                });
                if (gridOptions.selectFirstRow && gridList.rows.length > 0) {
                    gridList.rows[0].rowSelected = true;
                }

                return gridList;
            }   // end of getGridData

            // Paging
            function getDataListByPage(dataList, page, pageSize) {
                // page starts with 1
                if (!dataList || page <= 0) {
                    return null;
                }
                try {
                    dataList = sortData(dataList);

                    var start = (page - 1) * pageSize;
                    var pagedData = _.slice(dataList, start, start + pageSize);
                    if (!pagedData) {
                        return null;
                    }
                    return pagedData;
                } catch (e) {
                    console.log(e.message);
                    return null;
                }
            }   // end of getDataListByPage

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