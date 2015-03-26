(function (app) {
    app.controller('employeeCtrl', ['repositoryService', 'dbEntityService', employeeCtrl]);

    function employeeCtrl(repositoryService, dbEntityService) {
        var vm = this;
        vm.showDetail = false;
        vm.isFromBack = false;

        activate();


        function activate() {
            vm.gridOptions = setGridOptions();
            var employeeData = repositoryService.getDataList(dbEntityService.entities.employee);

            vm.gridOptions.data = employeeData;

            employeeData.then(function (data) {
                vm.employeeList = data;
            });
        }

        vm.employeeDetail = function (id) {
            vm.employee = _.find(vm.employeeList, function (e) {
                vm.showDetail = true;
                return e.EmployeeID === id;
            });
        };


        vm.backToList = function () {
            vm.isFromBack = true;
            vm.showDetail = false;
        }
    }

    function setGridOptions() {
        return {
            columnDefs: getColumnDefs(),
            enablePage: true,
            idField: 'EmployeeID'
        };
    }

    function getColumnDefs() {
        return [
            {
                field: 'EmployeeID',
                displayName: 'Id'
            }, {
                field: 'FirstName',
                displayName: 'First Name',
                isDetailLink: true
            },
            {
                field: 'LastName',
                displayName: 'Last Name'
            },
            {
                field: 'Title',
                displayName: 'Title'
            },
            {
                field: 'Country',
                displayName: 'Country'
            },
            {
                field: 'Region',
                displayName: 'Region'
            }
        ];
    }
})(angular.module('appNorthwind'));
