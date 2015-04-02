(function (app) {
    app.factory('commonService', ['$modal', '$parse', commonService]);
    function commonService($modal, $parse) {
        return {
            showProductModal: showProductModal,
            rainGridLinkFunc: rainGridLinkFunc
        };

        // Service Functions

        function showProductModal(productId) {
            var modalInstance = $modal.open({
                templateUrl: 'wwwroot/Views/Product/productModal.html',
                controller: 'productModalCtrl',
                resolve: {
                    productId: function () {
                        return productId;
                    }
                }
            });

            return modalInstance.result;
            /*modalInstance.result.then(function (obj) {
             // return value from $modalInstance.close(obj)
             }, function () {
             });*/
        }

        function rainGridLinkFunc(row, funcName, funcIdField, linkFunctions) {
            var field = _.find(row, function (col) {
                return col.fieldName === funcIdField;
            });
            if (field) {
                var id = field.value;
                var func = funcName + '(' + id + ')';
                var parseFunc = $parse(func);
                parseFunc(linkFunctions);
            }
        }

    }
})(angular.module('appNorthwind'));
