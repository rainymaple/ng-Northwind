(function (app) {
    app.controller('territoryCtrl', ['repositoryService', 'dbEntityService', territoryCtrl]);

    function territoryCtrl(repositoryService, dbEntityService) {
        var vm = this;

        activate();

        // Controller Functions

        function activate() {
            vm.gridOptions = setGridOptions();
            vm.gridOptions.data = repositoryService.getDataList(dbEntityService.entities.territory);
        }

    }

    function setGridOptions() {
        return {
            columnDefs: getColumnDefs(),
            idField: 'TerritoryID'
        };
    }

    function getColumnDefs() {
        return [
            {
                field: 'TerritoryID',
                displayName: 'Id'
            }, {
                field: 'TerritoryDescription',
                displayName: 'Description'
            }
        ];
    }

})(angular.module('appNorthwind'));
