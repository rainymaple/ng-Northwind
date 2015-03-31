(function (app) {
    app.controller('supplierCtrl', ['repositoryService', 'dbEntityService', supplierCtrl]);

    function supplierCtrl(repositoryService, dbEntityService) {
        var vm = this;

        activate();

        // controller functions

        function activate() {
            vm.gridOptions = setGridOptions();
            vm.gridOptions.data = repositoryService.getDataList(dbEntityService.entities.supplier);
        }

    }

    function setGridOptions() {
        return {
            columnDefs: getColumnDefs(),
            //pageSize: 20,
            idField: 'SupplierID'
        };
    }

    function getColumnDefs() {
        return [
            {
                field: 'SupplierID',
                displayName: 'Id'
            }, {
                field: 'CompanyName',
                displayName: 'Company',
                isDetailLink: false
            },
            {
                field: 'ContactName',
                displayName: 'Contact'
            },
            {
                field: 'ContactTitle',
                displayName: 'Contact'
            },
            {
                field: 'Country',
                displayName: 'Country'
            },
            {
                field: 'Phone',
                displayName: 'Phone'
            },
            {
                field: 'Fax',
                displayName: 'Fax'
            }
        ];
    }

})(angular.module('appNorthwind'));
