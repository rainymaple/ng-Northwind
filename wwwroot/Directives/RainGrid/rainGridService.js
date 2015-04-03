(function (app) {
    app.factory('rainGridService', ['$parse', rainGridService]);
    function rainGridService($parse) {
        return {
            rainGridLinkFunc: rainGridLinkFunc,
            filterData: filterData,
            modifyPaginationIcons: modifyPaginationIcons,
            getDataListByPage: getDataListByPage,
            buildGridData: buildGridData,
            sortData: sortData
        };

        // Service Functions

        function rainGridLinkFunc(params, linkFunctions) {
            var field = _.find(params.row, function (col) {
                return col.fieldName === params.funcIdField;
            });
            if (field) {
                var id = field.value;
                var func = params.funcName + '(' + id + ')';
                var parseFunc = $parse(func);
                parseFunc(linkFunctions);
            }
        }

        function filterData(data, filter) {
            return data;
        }

        function getDataListByPage(dataList, page, pageSize) {
            // page starts with 1
            if (!dataList || page <= 0) {
                return null;
            }
            try {
                //dataList = sortData(dataList);

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
        }   // end of buildHeader

        function buildGridData(gridOptions) {
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
            }

            return gridList;
        }   // end of buildGridData

        // Sorting
        function sortData(dataList, sortings, sortField, sortIndex) {
            var sortOrder = sortings[sortIndex];
            if (!sortField || !sortOrder) {
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
            return sortOrder === sortings[1] ? sortedData : sortedData.reverse();
        }   // end of sortData

        function modifyPaginationIcons() {
            $('ul.pagination a:contains("<<"):first').html("<i class='fa fa-angle-double-left page-arrow'></i>");
            $('ul.pagination a:contains(">>"):first').html("<i class='fa fa-angle-double-right page-arrow'></i>");
            $('ul.pagination a:contains("<"):first').html("<i class='fa fa-angle-left page-arrow'></i>");
            $('ul.pagination a:contains(">"):first').html("<i class='fa fa-angle-right page-arrow'></i>");
        }
    }
})(angular.module('appNorthwind'));
