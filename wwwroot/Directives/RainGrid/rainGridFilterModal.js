(function (app) {
    app.controller('rainGridFilterModalCtrl', ['$modalInstance', 'columnDefs', '$scope', rainGridFilterModalCtrl]);

    function rainGridFilterModalCtrl($modalInstance, columnDefs, $scope) {
        var filters = {};

        $scope.columns = _.map(columnDefs, function (col) {
            return {label: col.displayName, value: col.field}
        });
        $scope.col = $scope.columns[1];

        $scope.ok = function () {
            $modalInstance.close(filters);
        };
        $scope.cancel = function () {
            $modalInstance.close();
        };
    }


})(angular.module('appNorthwind'));