(function (app) {
    app.controller('shipperCtrl', ['repositoryService', 'dbEntityService', shipperCtrl]);

    function shipperCtrl(repositoryService, dbEntityService) {
        var vm = this;

        repositoryService.getDataList(dbEntityService.entities.shipper).then(function (data) {
            vm.list = data;
        });
    }

})(angular.module('appNorthwind'));
