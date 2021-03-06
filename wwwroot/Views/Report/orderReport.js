(function (app) {
    app.controller('orderReportCtrl', ['$scope', 'repositoryService', 'dbEntityConfig', 'commonService',
        orderReportCtrl]);

    function orderReportCtrl($scope, repositoryService, dbEntityConfig, commonService) {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var series = ['1996', '1997', '1998'];

        activate();

        // controller functions

        function activate() {
            repositoryService.getDataList(dbEntityConfig.entities.order).then(function (data) {
                if (data.length == 0) {
                    console.log("report data is empty");
                    return;
                }

                var orderCounts = {};

                _.forEach(series, function (serie) {
                    orderCounts[serie] = getMonthCount();
                });

                angular.forEach(data, function (order) {
                    var d = new Date(order.OrderDate);
                    var orderYear = d.getFullYear();
                    var orderMonth = d.getMonth();
                    orderCounts[orderYear][orderMonth]++;
                });


                // for line-chart
                $scope.labels = months;
                $scope.series = series;
                $scope.data = [];
                _.forEach(series, function (serie) {
                    $scope.data.push(orderCounts[serie])
                });

                $scope.onClick = function (points, evt) {
                    console.log(points, evt);
                };

                // for pie-chart
                $scope.pieLabels = series;
                $scope.pieData = sumOrders(orderCounts);
                $scope.pieLegend = true;


                // refresh the charts after size of side menu is changed
                // in sideMenu.js:
                // $rootScope.$broadcast("SideMenuSizeChanged", 'windowSize');
                $scope.$on('SideMenuSizeChanged', function (event, src) {
                    $scope.pieLabels = [];
                    $scope.series = [];
                    var s = series;
                    s[s.length - 1] = s[s.length - 1] + ' ';
                    $scope.series = s;
                    $scope.pieLabels = s;
                });
            })
        }

        function getMonthCount() {
            return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }

        function sumOrders(orderCounts) {
            var sum = [];
            angular.forEach(orderCounts, function (orderCount) {
                var yearOrders = 0;
                angular.forEach(orderCount, function (orders) {
                    yearOrders += orders;
                });
                sum.push(yearOrders);
            });
            return sum;
        }
    }


})(angular.module('appNorthwind'));
