(function (app) {
    app.directive('productListDir', ['repositoryService', 'dbEntityService', productListDir]);

    function productListDir(repositoryService, dbEntityService) {
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
                    dbEntityService.entities.productByCategoryId, $scope.categoryId);
            }

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