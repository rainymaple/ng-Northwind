(function (app) {
    app.directive('rainCheckbox', [rainCheckbox]);

    function rainCheckbox() {
        return {
            restrict: "AE",
            template: getTemplate(),
            replace: false,
            scope: {
                rainCheckbox: '='
            }
        }
    }

    function getTemplate() {
        return '<div style="display: block;padding-right: 30px;" class="clearfix">' +
            '<div style="margin:0 auto" class="ui-checkbox">' +
            '<input type="checkbox" ng-model="rainCheckbox"/>' +
            '<label class="checkbox-label" style="margin-top: 0"></label>' +
            '</div>' +
            '</div>';
    }
})(angular.module('appNorthwind'));