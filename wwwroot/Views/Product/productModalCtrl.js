(function (app) {
    app.controller('productModalCtrl', ['repositoryService', 'dbEntityConfig', '$modalInstance',
        'productId','$scope', productModalCtrl]);

    function productModalCtrl(repositoryService, dbEntityConfig, $modalInstance,productId,$scope) {

        repositoryService.getDataById(dbEntityConfig.entities.product,productId).then(function(data){
            $scope.product = data[0];
        });

        $scope.ok = function () {
            $modalInstance.close(productId);
        };

    }


})(angular.module('appNorthwind'));