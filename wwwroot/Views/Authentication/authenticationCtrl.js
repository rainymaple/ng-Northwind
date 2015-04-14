(function (app) {
    app.controller('authenticationCtrl', ['$scope', 'commonService', '$state', authenticationCtrl]);

    function authenticationCtrl($scope, commonService, $state) {
        var vm = this;
        vm.username = '';
        vm.password = '';

        activate();

        // controller functions

        function activate() {
            commonService.oauth.logout();
            $scope.$emit('SetAuthentication', false);
        }

        vm.login = function () {
            commonService.oauth.login(vm.username, vm.password).then(function (response) {
                if (response) {
                    $scope.$emit('SetAuthentication', response)
                }
                $state.go('home');
            })
        };
    }


})(angular.module('appNorthwind'));
