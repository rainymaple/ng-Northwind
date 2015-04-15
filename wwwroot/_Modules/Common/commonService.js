(function (app) {
    app.factory('commonService', ['$http', 'currentUser', commonService]);
    function commonService($http, currentUser) {
        return {
            oauth: {
                login: login,
                logout: logout
            }
        };

        // Service Functions

        function login(loginEndpoint, username, password) {
            var httpConfig = {
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            };
            var data = formEncode({
                username: username,
                password: password,
                grant_type: "password"
            });
            return $http.post(loginEndpoint, data, httpConfig).then(function (response) {
                currentUser.setProfile(username, response.data.access_token);
                return response;
            }, function (response) {
                return response;
            });
        }

        function logout() {
            currentUser.logout();
        }

    }

    // helper functions

    function formEncode(data) {
        var pairs = [];
        for (var name in data) {
            pairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
        return pairs.join('&').replace(/%20/g, '+');
    }
})(angular.module('appNorthwind'));
