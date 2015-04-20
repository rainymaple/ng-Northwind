(function (app) {

    var _stateLogin = 'login';
    var _loginPath = '/login';

    // service: addToken

    app.factory('addToken', ['$q', 'currentUser', addToken]);

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('addToken');
    });

    function addToken($q, currentUser) {

        var request = function (config) {
            if (currentUser.profile.loggedIn) {
                config.headers.Authorization = 'Bearer ' + currentUser.profile.token;
            }
            return $q.when(config);
        };
        return {
            request: request
        }
    }


    // service: loginRedirect

    app.factory('loginRedirect', ['$q', '$injector', '$location', loginRedirect]);

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('loginRedirect');
    });

    function loginRedirect($q, $injector, $location) {

        var lastPath = '/';
        var responseError = function (response) {
            if (response.status == 401 || response.status == 403) {

                if(response.status == 401) {
                    toastr.error('You are not authenticated to access this resource.', '401');
                }else{
                    toastr.error('You are not authorized to access this resource.', '403');
                }
                var stateService = $injector.get('$state');
                var locationPath = $location.path();
                if (locationPath !== _loginPath) {
                    lastPath = locationPath;
                }
                stateService.go(_stateLogin);
            }
            return $q.reject(response);
        };

        var redirectPostLogin = function () {
            var stateService = $injector.get('$state');
            if (stateService.current.url === lastPath) {
                lastPath = '/';
            }
            $location.path(lastPath);
            lastPath = '/';
        };

        return {
            responseError: responseError,
            redirectPostLogin: redirectPostLogin
        }
    }

})(angular.module('common'));
