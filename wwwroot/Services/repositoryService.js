(function (app) {
    app.factory('repositoryService', ['$http', repositoryService]);

    // entity is defined in dbEntityService

    function repositoryService($http) {
        return {
            getDataList: getDataList,
            getDataById: getDataById,
            getDataListByPage: getDataListByPage
        };


        function getDataList(entity) {
            return $http.get(entity.url).then(function (result) {
                return result.data;
            });
        }

        function getDataById(entity, id) {
            return $http.get(entity.url + '/' + id).then(function (result) {
                return result.data;
            });
        }

        function getDataListByPage(data, page, pageSize,sortField,sortOrder) {
            // page starts with 1
            if (!data || page <= 0) {
                return null;
            }
            try {
                //pageSize = parseInt(pageSize);
                var start = (page - 1) * pageSize;
                var pagedData = _.slice(data, start, start + pageSize);
                if (!pagedData) {
                    return null;
                }
                return pagedData;
            } catch (e) {
                console.log(e.message);
                return null;
            }
        }
    }
})(angular.module('appNorthwind'));

