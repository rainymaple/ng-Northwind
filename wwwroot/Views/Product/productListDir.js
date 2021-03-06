(function (app) {
    app.directive('productListDir', ['repositoryService', 'dbEntityConfig', 'nwCommonService', productListDir]);

    var _eventGetProductDetail = 'productListDir.productDetail';

    function productListDir(repositoryService, dbEntityConfig, nwCommonService) {
        return {
            restrict: 'AE',
            templateUrl: 'wwwroot/Views/Product/productListDir.html',
            replace: false,
            scope: {
                categoryId: '='
            },
            controller: controller

        };

        function controller($scope) {
            $scope.gridOptions = setGridOptions();

            getProducts();

            $scope.$watch('categoryId', function () {
                getProducts();
            });

            function getProducts() {
                if ($scope.categoryId === undefined) {
                    $scope.categoryId = 0;
                }
                $scope.gridOptions.data = repositoryService.getDataById(
                    dbEntityConfig.entities.productByCategoryId, $scope.categoryId);
            }

            $scope.$on(_eventGetProductDetail, function (event, data) {
                var id = data.id;
                var modalInstance = nwCommonService.showProductModal(id);
                modalInstance.then(function () {
                });
            });

        }   // controller

    }


    function setGridOptions() {
        return {
            columnDefs: getColumnDefs(),
            pageSize: 5,
            idField: 'ProductID',
            title: 'Products'
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
                linkFunc: {funcEvent: _eventGetProductDetail, funcIdField: 'ProductID'}
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