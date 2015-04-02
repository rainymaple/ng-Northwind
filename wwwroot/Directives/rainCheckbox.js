(function (app) {
    app.directive('rainCheckbox', [rainCheckbox]);

    function rainCheckbox() {
        return {
            restrict: "AE",
            template: getTemplate(),
            replace: false,
            scope: {
                rainCheckbox: '=',
                readonly: '='
            },
            controller: function ($scope) {
                $scope.onclick = function () {
                    if ($scope.readonly === true) {
                        return;
                    }
                    $scope.rainCheckbox = !$scope.rainCheckbox;
                }
            }
        }
    }

    function getTemplate() {
        return '<div class="clearfix" style="margin-top: 2px;">' +
            '<div style="display: block; class="clearfix">' +
            '<div style="margin:0 auto" class="ui-checkbox">' +
            '<input type="checkbox" ng-model="rainCheckbox" style="width: 0px;"/>' +
            '<label class="checkbox-label" style="margin-top: 0" ng-click="onclick()"></label>' +
            '</div>' + '</div>' +
            '</div>';
    }
})(angular.module('appNorthwind'));