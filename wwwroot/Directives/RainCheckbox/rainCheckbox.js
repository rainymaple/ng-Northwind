(function (app) {
    app.directive('rainCheckbox', [rainCheckbox]);

    function rainCheckbox() {
        return {
            restrict: "AE",
            template: getTemplate(),
            replace: false,
            scope: {
                rainCheckbox: '=',
                text: '@',
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
        return '<div class="clearfix" style="display:table;margin: 0 auto;padding: 3px 10px 0 0;">' +
            '<div class="pull-right" style="font-size: 16px;font-weight: bold;margin-left: 5px;">' +
            '{{text}}</div>' +
            '<div class="pull-right">'+
            '<div style="margin:0 auto" class="rain-checkbox">' +
            '<input type="checkbox" ng-model="rainCheckbox" style="width: 0px;"/>' +
            '<label class="checkbox-label" style="margin-top: 0" ng-click="onclick()"></label>' +
            '</div></div></div>';
    }
})(angular.module('appNorthwind'));