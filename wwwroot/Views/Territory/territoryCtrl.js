(function (app) {
    app.controller('territoryCtrl', ['repositoryService', 'dbEntityService', territoryCtrl]);

    function territoryCtrl(repositoryService, dbEntityService) {
        var vm = this;
        vm.currentPage = 1;
        vm.pageSize = 5;

        (function () {
            repositoryService.getDataList(dbEntityService.entities.territory).then(function (data) {
                vm.data = data;
                setPageData(data);
            });

        })();

        function setPageData(data) {
            vm.list = repositoryService.getDataListByPage(data, vm.currentPage, vm.pageSize);
            vm.rowCount = data.length;
            vm.maxSize = 3;
        }
        vm.setPage = function (pageNo) {
            vm.currentPage = pageNo;
        };

        vm.pageChanged = function() {
            setPageData(vm.data);
        };
        vm.pageSizeChanged = function(){
            vm.currentPage=1;
            setPageData(vm.data);
        }
    }

})(angular.module('appNorthwind'));
