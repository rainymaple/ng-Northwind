(function (app) {
    app.directive('orderDetailListDir', ['repositoryService', 'dbEntityConfig',
        'nwCommonService', 'rainGridService',orderDetailListDir]);

    function orderDetailListDir(repositoryService, dbEntityConfig, nwCommonService,rainGridService) {
        return {
            restrict: 'AE',
            templateUrl: 'wwwroot/Views/Order/orderDetailListDir.html',
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
                    dbEntityConfig.entities.orderDetails, $scope.orderId);
            }


            var linkFunctions = {
                productDetail: function (id) {
                    var modalInstance = nwCommonService.showProductModal(id);
                    modalInstance.then(function () {
                    });
                }
            };
            $scope.linkFunc = function (params) {
                rainGridService.rainGridLinkFunc(params,linkFunctions);
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
            }, {
                field: 'ProductName',
                displayName: 'Product Name',
                isLink: true,
                linkFunc: {funcName: 'productDetail', funcIdField: 'ProductID'}
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