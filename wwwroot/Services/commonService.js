(function (app) {
    app.factory('commonService', ['$modal', '$timeout', commonService]);
    function commonService($modal, $timeout) {
        return {
            showProductModal: showProductModal
        };

        // Service Functions

        function showProductModal(productId){
            var modalInstance = $modal.open({
                templateUrl: 'wwwroot/Views/Product/productModal.html',
                controller:'productModalCtrl',
                resolve: {
                    productId: function(){return productId;}
                }
            });

            return modalInstance.result;
            /*modalInstance.result.then(function (obj) {
                // return value from $modalInstance.close(obj)
            }, function () {
            });*/
        }
}
})(angular.module('appNorthwind'));
