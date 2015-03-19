(function (app) {
    app.controller('supplierCtrl', ['repositoryService', 'dbEntityService', supplierCtrl]);

    function supplierCtrl(repositoryService, dbEntityService) {
        var vm = this;

        repositoryService.getDataList(dbEntityService.entities.supplier).then(function (data) {
            vm.list = data;
        });
    }

})(angular.module('appNorthwind'));
