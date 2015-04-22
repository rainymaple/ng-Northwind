(function (app) {
    app.controller('orderEditCtrl', ['$scope', 'repositoryService', 'dbEntityConfig', 'commonService', orderEditCtrl]);

    function orderEditCtrl($scope, repositoryService, dbEntityConfig, commonService) {
        $scope.order = {customer:'',shipName:'',shipCountry:'',freight:'',shippedDate:'',requiredDate:'',orderDate:''};
        $scope.customer = {};
        $scope.country = {};
        $scope.test=null;

        activate();

        // controller functions

        function activate() {

            setDatePicker();
            getLookupData();


        }

        function getLookupData() {
            repositoryService.getDataList(dbEntityConfig.entities.customer)
                .then(function (data) {
                    $scope.customers = data;
                });
            repositoryService.getDataList(dbEntityConfig.entities.country)
                .then(function (data) {
                    $scope.countries = data;
                });
        }

        function setDatePicker() {
            $scope.today = function () {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.clear = function () {
                $scope.dt = null;
            };

            // Disable weekend selection
            $scope.disableWeekend = function (date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            $scope.toggleMin = function () {
                $scope.minDate = $scope.minDate ? null : new Date();
            };
            $scope.toggleMin();

            $scope.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
        }
    }

})(angular.module('appNorthwind'));
