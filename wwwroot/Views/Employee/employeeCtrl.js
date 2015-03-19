(function (app) {
    app.controller('employeeCtrl', ['repositoryService', 'dbEntityService', employeeCtrl]);

    function employeeCtrl(repositoryService, dbEntityService) {
        var vm = this;

        repositoryService.getDataList(dbEntityService.entities.employee).then(function (data) {
            vm.employeeList = data;
        });

        vm.employeeDetail = function (id) {
            vm.employee = _.find(vm.employeeList, function (e) {
                return e.EmployeeID === id;
            });
            console.log(vm.employee.EmployeeID);
        }
    }

})(angular.module('appNorthwind'));
