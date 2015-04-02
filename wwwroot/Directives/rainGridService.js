(function (app) {
    app.factory('rainGridService', ['$parse', rainGridService]);
    function rainGridService($parse) {
        return {
            rainGridLinkFunc: rainGridLinkFunc,
            filterData : filterData,
            modifyPaginationIcons:modifyPaginationIcons,
            getDataListByPage:getDataListByPage
        };

        // Service Functions

        function rainGridLinkFunc(params, linkFunctions) {
            var field = _.find(params.row, function (col) {
                return col.fieldName === params.funcIdField;
            });
            if (field) {
                var id = field.value;
                var func = params.funcName + '(' + id + ')';
                var parseFunc = $parse(func);
                parseFunc(linkFunctions);
            }
        }

        function filterData(data,filter){
            return data;
        }

        function getDataListByPage(dataList, page, pageSize) {
            // page starts with 1
            if (!dataList || page <= 0) {
                return null;
            }
            try {
                //dataList = sortData(dataList);

                var start = (page - 1) * pageSize;
                var pagedData = _.slice(dataList, start, start + pageSize);
                if (!pagedData) {
                    return null;
                }
                return pagedData;
            } catch (e) {
                console.log(e.message);
                return null;
            }
        }   // end of getDataListByPage

        function modifyPaginationIcons(){
            $('ul.pagination a:contains("<<"):first').html("<i class='fa fa-angle-double-left page-arrow'></i>");
            $('ul.pagination a:contains(">>"):first').html("<i class='fa fa-angle-double-right page-arrow'></i>");
            $('ul.pagination a:contains("<"):first').html("<i class='fa fa-angle-left page-arrow'></i>");
            $('ul.pagination a:contains(">"):first').html("<i class='fa fa-angle-right page-arrow'></i>");
        }
    }
})(angular.module('appNorthwind'));
