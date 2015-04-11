(function () {
    "use strict";
    var app = angular.module("appNorthwind", [
        "ui.router", "ui.mask", "ui.bootstrap",'ngAnimate','chart.js','rainGrid'
        /*,'angular-loading-bar'*/
        , 'northwindDbMock'
    ]);

    var config = {
        docTitle: "ng-NorthWind",
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

    app.controller('appCtrl', ['$window', appCtrl]);
    function appCtrl($window) {

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


})();