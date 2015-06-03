(function () {
    "use strict";
    var app = angular.module("appNorthwind", [
        "ui.router", "ui.mask", "ui.bootstrap", 'ngAnimate', 'chart.js','ngMessages','ui.select', 'ngSanitize',
        'rain.grid','rain.form','rain.checkbox','common'
        /*,'angular-loading-bar'*/
        , 'northwindDbMock'
    ]);

    var config = {
        docTitle: "ng-NorthWind",
        loginEndpoint: '/api/login',
        cacheMaxAge: 5000,
        enableConsoleLog: true,
        enableToastrLog: true,
        version: '1.0.0'
    };


    app.value("config", config);


    app.config(["$logProvider", function ($logProvider) {
        // turn debugging off/on
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }]);

    app.controller('appCtrl', ['$window', '$scope','currentUser', appCtrl]);

    function appCtrl($window, $scope,currentUser) {

        $scope.isLoggedIn = currentUser.profile.loggedIn;

        // loginCtrl emits 'SetAuthentication' after login or logout

        $scope.$on('SetAuthentication', function (e, response) {
            $scope.isLoggedIn = currentUser.profile.loggedIn;
        });

        setupWindowSize($window);

        function setupWindowSize($window) {
            var win = angular.element($window);
            win.bind("load resize", function () {
                if ($(this).width() < 769) {
                    $('body').addClass('body-small');
                } else {
                    $('body').removeClass('body-small')
                }
                /*var windowSize = common.currentWindowSize();
                 $rootScope.$broadcast("windowSizeChanged", windowSize);*/
            });
        }
    }
    app.filter('propsFilter', function() {
        return function(items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function(item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        }
    });

})();