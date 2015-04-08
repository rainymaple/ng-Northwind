(function (app) {
    app.controller('shipperCtrl', ['repositoryService', 'dbEntityConfig', shipperCtrl]);

    function shipperCtrl(repositoryService, dbEntityConfig) {
        var vm = this;

        activate();

        // Controller Functions

        function activate() {
            setGridOptions();
            vm.gridOptions.data =repositoryService.getDataList(dbEntityConfig.entities.shipper);
        }

        function setGridOptions() {
            vm.gridOptions = {
                columnDefs: getColumnDefs(),
                idField: 'ShipperID'
            };
        }
    }

    function getColumnDefs() {
        return [
            {
                field: 'ShipperID',
                displayName: 'Id'
            }, {
                field: 'CompanyName',
                displayName: 'Company',
                isDetailLink: false
            },
            {
                field: 'Phone',
                displayName: 'Phone'
            }
        ];
    }
})(angular.module('appNorthwind'));
