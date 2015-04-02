(function (app) {
    app.factory('rainGridService', ['$parse', rainGridService]);
    function rainGridService($parse) {
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
