(function (app) {
    app.controller('categoryCtrl', ['repositoryService', 'dbEntityService', categoryCtrl]);

    function categoryCtrl(repositoryService, dbEntityService) {
        var vm = this;
        vm.gridOptions = {
            enableColumnResize: true,
            columnDefs: getColumnDefs(),
            showColumnMenu: true,
            showFilter: true,
            showFooter: false,
            showSelectionCheckbox: true,
            maintainColumnRatios: true,
            jqueryUITheme: true
        };

        repositoryService.getDataList(dbEntityService.entities.category).then(function (data) {
                vm.categoryList = data;
                vm.gridOptions.data = data;
            });

    }

    function getColumnDefs() {
        return [
            {
                field: 'CategoryID',
                displayName: 'Id',
                width: '40'
            }, {
                field: 'CategoryName',
                displayName: 'Name',
                width: '180'
            }, {
                field: 'Description'
            }
        ];
    }
})(angular.module('appNorthwind'));
