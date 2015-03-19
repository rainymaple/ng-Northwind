(function (app) {
    app.controller('customerCtrl', ['repositoryService', 'dbEntityService', customerCtrl]);

    function customerCtrl(repositoryService, dbEntityService) {
        var vm = this;

        repositoryService.getDataList(dbEntityService.entities.customer).then(function (data) {
            vm.customerList = data;
        });
    }

})(angular.module('appNorthwind'));
