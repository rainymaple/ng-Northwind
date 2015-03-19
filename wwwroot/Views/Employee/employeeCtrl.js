(function (app) {
    app.controller('employeeCtrl', ['repositoryService', 'dbEntityService', employeeCtrl]);

    function employeeCtrl(repositoryService, dbEntityService) {
        var vm = this;
        vm.showDetail = false;
        vm.isFromBack = false;

        repositoryService.getDataList(dbEntityService.entities.employee).then(function (data) {
            vm.employeeList = data;
        });

        vm.employeeDetail = function (id) {
            vm.employee = _.find(vm.employeeList, function (e) {
                vm.showDetail = true;
                return e.EmployeeID === id;
            });
        }

        vm.backToList = function () {
            vm.isFromBack = true;
            vm.showDetail = false;
        }
    }

})(angular.module('appNorthwind'));
