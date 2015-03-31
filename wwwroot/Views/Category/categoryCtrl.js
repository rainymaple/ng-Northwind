(function (app) {
    app.controller('categoryCtrl', ['repositoryService', 'dbEntityService', categoryCtrl]);

    function categoryCtrl(repositoryService, dbEntityService) {
        var vm = this;

        activate();

        // controller functions

        function activate() {
            vm.gridOptions = setGridOptions();
            vm.gridOptions.data = repositoryService.getDataList(dbEntityService.entities.category);
            vm.gridOptions.data.then(function(data){
                if(data.length>0){
                    vm.categoryId = data[0].CategoryID;
                }
            })
        }

        vm.onSelect = function(id){
            vm.categoryId= id;
        }
    }


    function setGridOptions() {
        return {
            columnDefs: getColumnDefs(),
            enablePage: true,
            idField: 'CategoryID',
            //pageSize: 5,
            selectable: true,
            selectFirstRow: true
        };
    }

    function getColumnDefs() {
        return [
            {
                field: 'CategoryID',
                displayName: 'Id'
            }, {
                field: 'CategoryName',
                displayName: 'Name'
            }, {
                field: 'Description',
                displayName: 'Description'
            }
        ];
    }
})(angular.module('appNorthwind'));
