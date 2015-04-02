(function (app) {
    app.controller('orderListCtrl', ['repositoryService', 'dbEntityService','commonService', orderListCtrl]);

    function orderListCtrl(repositoryService, dbEntityService,commonService) {
        var vm = this;
        vm.selectedRow = false;
        vm.showDetail = true;

        activate();

        // controller functions

        function activate() {
            vm.gridOptions = setGridOptions();
            vm.gridOptions.data = repositoryService.getDataList(dbEntityService.entities.order);
            vm.gridOptions.data.then(function (data) {
                if (data.length > 0) {
                    vm.orderId = data[0].OrderID;
                }
            })
        }

        vm.onSelect = function (id) {
            vm.orderId = id;
            vm.selectedRow = true;
        };



    }


    function setGridOptions() {
        return {
            columnDefs: getColumnDefs(),
            enablePage: true,
            idField: 'OrderID',
            pageSize: 5,
            selectable: true,
            selectFirstRow: false
        };
    }

    function getColumnDefs() {
        return [
            {
                field: 'OrderID',
                displayName: 'Id'
            }, {
                field: 'CustomerID',
                displayName: 'Customer'
            }, {
                field: 'OrderDate',
                displayName: 'Order Date',
                isDate: true
            }, {
                field: 'RequiredDate',
                displayName: 'Required Date',
                isDate: true
            }, {
                field: 'ShippedDate',
                displayName: 'Shipped Date',
                isDate: true
            }, {
                field: 'Freight',
                displayName: 'Freight',
                isNumber: true,
                decimal: 2
            }, {
                field: 'ShipName',
                displayName: 'ShipName'
            }, {
                field: 'ShipCountry',
                displayName: 'Ship Country'
            }
        ];
    }
})(angular.module('appNorthwind'));
