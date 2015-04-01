(function (app) {
    app.controller('productCtrl', ['repositoryService', 'dbEntityService','$modal', productCtrl]);

    function productCtrl(repositoryService, dbEntityService, $modal) {
        var vm = this;

        activate();

        // controller functions

        function activate() {
            vm.gridOptions = setGridOptions();
            vm.gridOptions.data = repositoryService.getDataList(dbEntityService.entities.product);
        }

        vm.productDetail = function (id) {
            showProductModal(id);
        };


        function showProductModal(id) {
            var modalInstance = $modal.open({
                templateUrl: 'wwwroot/Views/Product/productModal.html',
                controller:'productModalCtrl',
                resolve: {
                    productId: function(){return id;}
                }
            });

            modalInstance.result.then(function (obj) {
                // return value from $modalInstance.close(obj)
            }, function () {
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
                isLink: true
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
