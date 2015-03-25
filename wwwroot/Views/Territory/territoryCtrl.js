(function (app) {
    app.controller('territoryCtrl', ['repositoryService', 'dbEntityService', territoryCtrl]);

    function territoryCtrl(repositoryService, dbEntityService) {
        var vm = this;


        (function () {
            setGridOptions();
            repositoryService.getDataList(dbEntityService.entities.territory).then(function (data) {
                vm.gridOptions.data = data;
            });

        })();

        function setGridOptions() {
            vm.gridOptions = {
                enableColumnResize: true,
                columnDefs: getColumnDefs(),
                enablePage: true
            };
        }

        function getColumnDefs() {
            return [
                {
                    field: 'TerritoryID',
                    displayName: 'Id',
                    width: '40'
                }, {
                    field: 'TerritoryDescription',
                    displayName: 'Description',
                    width: '180'
                }
            ];
        }

    }

})(angular.module('appNorthwind'));
