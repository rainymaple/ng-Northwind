(function (app) {
    app.controller('territoryCtrl', ['repositoryService', 'dbEntityService', territoryCtrl]);

    function territoryCtrl(repositoryService, dbEntityService) {
        var vm = this;

        repositoryService.getDataList(dbEntityService.entities.territory).then(function (data) {
            vm.list = data;
        });
    }

})(angular.module('appNorthwind'));
