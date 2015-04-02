(function (app) {
    app.directive('orderDetailListDir', ['repositoryService', 'dbEntityService', 'commonService', orderDetailListDir]);

    function orderDetailListDir(repositoryService, dbEntityService, commonService) {
        return {
            restrict: 'AE',
            template: '<div class="table-responsive"><div rain-grid="gridOptions" func-link="productDetail(id)"></div></div>',
            replace: false,
            scope: {
                orderId: '='
            },
            controller: controller

        };

        function controller($scope) {
            $scope.gridOptions = setGridOptions();

            getProducts();

            $scope.$watch('orderId', function () {
                getProducts();
            });

            function getProducts() {
                if ($scope.orderId === undefined) {
                    $scope.orderId = 0;
                }
                $scope.gridOptions.data = repositoryService.getDataById(
                    dbEntityService.entities.orderDetails, $scope.orderId);
            }

            $scope.productDetail = function (id) {
                var modalInstance = commonService.showProductModal(id);
                modalInstance.then(function () {
                });
            };
        }   // controller

    }


    function setGridOptions() {
        return {
            columnDefs: getColumnDefs(),
            pageSize: 5,
            idField: 'OrderID',
            title: 'Order Details'
        };
    }

    function getColumnDefs() {
        return [
            {
                field: 'OrderID',
                displayName: 'Id'
            }, {
                field: 'ProductID',
                displayName: 'ProductID',
                isHidden: true
            },{
                field: 'ProductName',
                displayName: 'Product Name',
                isLink: true,
                funcName:"productDetail"
            },
            {
                field: 'UnitPrice',
                displayName: 'Unit Price',
                isCurrency: true
            },
            {
                field: 'Quantity',
                displayName: 'Quantity',
                isNumber: true
            },
            {
                field: 'Discount',
                displayName: 'Discount',
                isNumber: true,
                decimal: 2
            }
        ];
    }
})(angular.module('appNorthwind'));