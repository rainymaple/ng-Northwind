(function (app) {
    app.controller('topNavCtrl', ["$scope", '$state', 'currentUser', topNavCtrl]);

    function topNavCtrl($scope, $state, currentUser) {

        $scope.username = currentUser.profile.username;

        $scope.logout = function () {
            $state.go('login');
        }
    }

})(angular.module('appNorthwind'));
