(function (app) {
    app.directive('rainGridMenu', ['rainGridService',rainGridMenu]);

    function rainGridMenu(rainGridService) {
        return {
            restrict: "AE",
            templateUrl: "wwwroot/Directives/RainGrid/rainGridMenu.html",
            replace: false,
            scope: true,
            controller: function ($scope) {
                // menu config
                $scope.status = {
                    isopen: false
                };

                $scope.toggled = function (open) {
                    console.log('Dropdown is now: ', open);
                };

                $scope.toggleDropdown = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.status.isopen = !$scope.status.isopen;
                };

                // event handlers

                $scope.doFilter = function () {
                    var modalInstance = rainGridService.showFilterModal($scope.gridOptions);
                    modalInstance.then(function () {
                    });
                }
            }
        }
    }


})(angular.module('appNorthwind'));