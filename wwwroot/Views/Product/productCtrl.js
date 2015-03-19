(function (app) {
    app.controller('productCtrl', ['repositoryService', 'dbEntityService', productCtrl]);

    function productCtrl(repositoryService, dbEntityService) {
        var vm = this;

        repositoryService.getDataList(dbEntityService.entities.product).then(function (data) {
            vm.list = data;
        });
    }

})(angular.module('appNorthwind'));
