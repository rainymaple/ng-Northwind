(function (app) {
    app.controller('topNavCtrl', ["$rootScope", "$scope", "$window", topNavCtrl]);

    function topNavCtrl($rootScope, $scope, $window) {

        activate();

        function activate() {
            //setupWindowSize($window);
        }

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

})(angular.module('appNorthwind'));
