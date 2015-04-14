(function (app) {
    app.factory('addToken', ['$q', 'currentUser', addToken]);

    function addToken($q, currentUser) {

        var request = function (config) {
            if (currentUser.profile.loggedIn) {
                config.headers.Authorization = 'Bearer ' + currentUser.profile.token;
            }
            return $q.when(config);
        }
        return {
            request: request
        }
    }

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('addToken');
    })
})(angular.module('appNorthwind'));
