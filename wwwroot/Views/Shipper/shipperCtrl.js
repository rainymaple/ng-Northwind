(function (app) {
    app.controller('shipperCtrl', ['repositoryService', 'dbEntityService', shipperCtrl]);

    function shipperCtrl(repositoryService, dbEntityService) {
        var vm = this;

        activate();

        // Controller Functions

        function activate() {
            setGridOptions();
            vm.gridOptions.data =repositoryService.getDataList(dbEntityService.entities.shipper);
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
