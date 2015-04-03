(function (app) {
    app.controller('productCtrl', ['repositoryService', 'dbEntityService', 'commonService',
        'rainGridService','$parse', productCtrl]);

    function productCtrl(repositoryService, dbEntityService, commonService,rainGridService, $parse) {
        var vm = this;

        activate();

        // controller functions

        function activate() {
            vm.gridOptions = setGridOptions();
            vm.gridOptions.data = repositoryService.getDataList(dbEntityService.entities.product);
        }

        var linkFunctions = {
            productDetail: function (id) {
                showProductModal(id);
            }
        };
        vm.linkFunc = function (params) {
            rainGridService.rainGridLinkFunc(params,linkFunctions);
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
