(function (app) {
    app.controller('loginCtrl', ['$scope', 'commonService', '$state', 'config', 'loginRedirect', loginCtrl]);

    function loginCtrl($scope, commonService, $state, config, loginRedirect) {
        var vm = this;
        vm.username = '';
        vm.password = '';

        var loginError = 'The user name or password is incorrect';

        activate();

        // controller functions

        function activate() {
            commonService.oauth.logout();
            $scope.$emit('SetAuthentication', false);
        }

        vm.login = function () {
            commonService.oauth.login(config.loginEndpoint, vm.username, vm.password).then(function (response) {
                if (response) {
                    $scope.$emit('SetAuthentication', response)
                    if (response.status !== 200) {
                        var message = response.statusText || loginError;
                        toastr.error(message);
                    } else {
                        loginRedirect.redirectPostLogin();
                    }
                }
                //$state.go('home');
            }, function (response) {
            })
        };
    }


})(angular.module('appNorthwind'));
