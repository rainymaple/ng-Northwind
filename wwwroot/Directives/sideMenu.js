(function (app) {
    angular.module(app).directive('minimizeSidebar', function ($timeout) {
        return {
            restrict: 'A',
            template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimize()"><i class="glyphicon glyphicon-fullscreen" ></i></a>',
            controller: function ($scope, $element) {

                var sideNav = 'body';//'body .side-navigation';
                $scope.minimize = function () {
                    $(sideNav).toggleClass("mini-navbar");
                    if (!$(sideNav).hasClass('mini-navbar') || $(sideNav).hasClass('body-small')) {
                        // Hide menu in order to smoothly turn on when maximize menu
                        $('#side-menu').hide();
                        // For smoothly turn on menu
                        $timeout(function () {
                            $('#side-menu').fadeIn(500);
                        }, 100);
                        $element.find('i').removeClass("glyphicon-chevron-right");
                        $element.find('i').addClass("glyphicon-chevron-left");
                    } else {
                        // Remove all inline style from jquery fadeIn function to reset menu state
                        $('#side-menu').removeAttr('style');
                        $element.find('i').removeClass("glyphicon-chevron-left");
                        $element.find('i').addClass("glyphicon-chevron-right");
                    }
                    /*$('.context-buttons .nav li a span').css({"display": "inline-block"});
                     $('.context-buttons .nav li a').css({"font-size": "13px"});*/
                }
            }
        };
    });
    angular.module(app).directive('sideNavigation', function sideNavigation() {
        return {
            restrict: 'A',
            link: function (scope, element) {
                // Call the metsiMenu plugin and plug it to sidebar navigation
                element.metisMenu();
            }
        };
    })
})('appNorthwind');