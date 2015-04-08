(function (app) {
    app.controller('supplierCtrl', ['repositoryService', 'dbEntityConfig', supplierCtrl]);

    function supplierCtrl(repositoryService, dbEntityConfig) {
        var vm = this;

        activate();

        // controller functions

        function activate() {
            vm.gridOptions = setGridOptions();
            vm.gridOptions.data = repositoryService.getDataList(dbEntityConfig.entities.supplier);
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
                displayName: 'Contact Name'
            },
            {
                field: 'ContactTitle',
                displayName: 'Contact Title'
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
