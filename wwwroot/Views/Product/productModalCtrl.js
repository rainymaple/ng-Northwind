(function (app) {
    app.controller('productModalCtrl', ['repositoryService', 'dbEntityService', '$modalInstance',
        'productId','$scope', productModalCtrl]);

    function productModalCtrl(repositoryService, dbEntityService, $modalInstance,productId,$scope) {

        repositoryService.getDataById(dbEntityService.entities.product,productId).then(function(data){
            $scope.product = data[0];
        });

        $scope.ok = function () {
            $modalInstance.close(productId);
        };

    }


})(angular.module('appNorthwind'));