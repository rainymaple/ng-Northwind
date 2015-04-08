(function (app) {
    app.controller('customerCtrl', ['repositoryService', 'dbEntityConfig', customerCtrl]);

    function customerCtrl(repositoryService, dbEntityConfig) {
        var vm = this;
        activate();

        // controller functions

        function activate() {
            vm.gridOptions = setGridOptions();
            vm.gridOptions.data = repositoryService.getDataList(dbEntityConfig.entities.customer);
        }

    }

    function setGridOptions() {
        return {
            columnDefs: getColumnDefs(),
            idField: 'CustomerID',
            selectable: false
        };
    }

    function getColumnDefs() {
        return [
            {
                field: 'CustomerID',
                displayName: 'Id'
            },
            {
                field: 'CompanyName',
                displayName: 'Company'
            },
            {
                field: 'ContactName',
                displayName: 'Contact'
            },
            {
                field: 'ContactTitle',
                displayName: 'Title'
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
