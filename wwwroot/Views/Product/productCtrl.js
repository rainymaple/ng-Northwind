(function (app) {
    app.controller('productCtrl', ['repositoryService', 'dbEntityService', productCtrl]);

    function productCtrl(repositoryService, dbEntityService) {
        var vm = this;

        activate();

        // controller functions

        function activate() {
            vm.gridOptions = setGridOptions();
            vm.gridOptions.data = repositoryService.getDataList(dbEntityService.entities.product);
        }

        vm.productDetail = function (id) {
            console.log(id);
        };
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
                isDetailLink: true
            },
            {
                field: 'QuantityPerUnit',
                displayName: 'Quantity Per Unit'
            },
            {
                field: 'UnitPrice',
                displayName: 'Unit Price'
            },
            {
                field: 'UnitsInStock',
                displayName: 'Units In Stock'
            },
            {
                field: 'UnitsOnOrder',
                displayName: 'Units On Order'
            },
            {
                field: 'ReorderLevel',
                displayName: 'Reorder Level'
            },
            {
                field: 'Discontinued',
                displayName: 'Discontinued',
                isCheckbox: true
            }
        ];
    }

})(angular.module('appNorthwind'));
