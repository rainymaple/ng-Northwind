(function (app) {
    app.controller('employeeCtrl', ['$scope','repositoryService', 'dbEntityConfig', 'rainGridService', employeeCtrl]);

    var _employeeDetailEvent ='employeeCtrl.employeeDetail';

    function employeeCtrl($scope,repositoryService, dbEntityConfig, rainGridService) {
        var vm = this;
        vm.showDetail = false;
        vm.isFromBack = false;

        activate();


        function activate() {
            vm.gridOptions = setGridOptions();
            var employeeData = repositoryService.getDataList(dbEntityConfig.entities.employee);

            vm.gridOptions.data = employeeData;
            employeeData.then(function (data) {
                vm.employeeList = data;
            });
        }

        $scope.$on(_employeeDetailEvent,function(event,data){
            var id=data.id;
            vm.employee = _.find(vm.employeeList, function (e) {
                vm.showDetail = true;
                return e.EmployeeID === id;
            });
        });

        vm.backToList = function () {
            vm.isFromBack = true;
            vm.showDetail = false;
        }
    }

    function setGridOptions() {
        return {
            columnDefs: getColumnDefs(),
            enablePage: true,
            idField: 'EmployeeID',
            selectable: false
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
                isLink: true,
                linkFunc: {funcEvent: _employeeDetailEvent, funcIdField: 'EmployeeID'}
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
