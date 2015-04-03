(function (app) {
    app.directive('rainGridMenu', [rainGridMenu]);

    function rainGridMenu() {
        return {
            restrict: "AE",
            templateUrl: "wwwroot/Directives/RainGrid/rainGridMenu.html",
            replace: false,
            scope: true,
            controller: function ($scope) {
                $scope.status = {
                    isopen: false
                };
                var aa = $scope.gridOptions;
                $scope.toggled = function (open) {
                    console.log('Dropdown is now: ', open);
                };

                $scope.toggleDropdown = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.status.isopen = !$scope.status.isopen;
                };
            }
        }
    }


})(angular.module('appNorthwind'));