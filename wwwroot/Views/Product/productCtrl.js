(function (app) {
    app.controller('productCtrl', ['repositoryService', 'dbEntityService', 'commonService', productCtrl]);

    function productCtrl(repositoryService, dbEntityService, commonService) {
        var vm = this;

        activate();

        // controller functions

        function activate() {
            vm.gridOptions = setGridOptions();
            vm.gridOptions.data = repositoryService.getDataList(dbEntityService.entities.product);
        }

        vm.linkFunc = function (row, funcName, funcIdField) {
            var field = _.find(row, function (col) {
                return col.fieldName === funcIdField;
            });
            var id = field.value;
            if (funcName === 'productDetail') {
                productDetail(id);
            }
        };

        var productDetail = function (id) {
            showProductModal(id);
        };


        function showProductModal(id) {
            var modalInstance = commonService.showProductModal(id);
            modalInstance.then(function () {
            });
        }
    }


    function setGridOptions() {
        return {
            columnDefs: getColumnDefs(),
            idField: 'ProductID'
        };
    }

    function getColumnDefs() {
        return [
            {
                field: 'ProductID',
                displayName: 'Id'
            }, {
                field: 'ProductName',
                displayName: 'Name',
                isLink: true,
                linkFunc: {funcName: 'productDetail', funcIdField: 'ProductID'}
            },
            {
                field: 'QuantityPerUnit',
                displayName: 'Quantity Per Unit'
            },
            {
                field: 'UnitPrice',
                displayName: 'Unit Price',
                isCurrency: true
            },
            {
                field: 'UnitsInStock',
                displayName: 'Units In Stock',
                isNumber: true
            },
            {
                field: 'UnitsOnOrder',
                displayName: 'Units On Order',
                isNumber: true
            },
            {
                field: 'ReorderLevel',
                displayName: 'Reorder Level',
                isNumber: true
            },
            {
                field: 'Discontinued',
                displayName: 'Discontinued',
                isCheckbox: true
            }
        ];
    }

})(angular.module('appNorthwind'));
