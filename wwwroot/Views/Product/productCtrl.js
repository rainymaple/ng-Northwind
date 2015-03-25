(function (app) {
    app.controller('productCtrl', ['repositoryService', 'dbEntityService', productCtrl]);

    function productCtrl(repositoryService, dbEntityService) {
        var vm = this;

        activate();

        // controller functions

        function activate() {
            setGridOptions();
            repositoryService.getDataList(dbEntityService.entities.product).then(function (data) {
                vm.gridOptions.data = data;
            });
        }


        function setGridOptions() {
            vm.gridOptions = {
                columnDefs: getColumnDefs(),
                enablePage: true
            };
        }

        function getColumnDefs() {
            return [
                {
                    field: 'ProductID',
                    displayName: 'Id'
                }, {
                    field: 'ProductName',
                    displayName: 'Name'
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
                    isCheckbox:true
                }
            ];
        }
    }

})(angular.module('appNorthwind'));
