(function (app) {
    app.controller('topNavCtrl', ["$scope", '$state', 'currentUser','commonService', topNavCtrl]);

    function topNavCtrl($scope, $state, currentUser,commonService) {

        $scope.username = currentUser.profile.username;

        $scope.logout = function () {
            commonService.oauth.logout();
            $state.go('login');
        }
    }

})(angular.module('appNorthwind'));
