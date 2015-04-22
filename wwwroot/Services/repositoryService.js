(function (app) {
    app.factory('repositoryService', ['$http', '$timeout', repositoryService]);

    // entity is defined in dbEntityConfig

    function repositoryService($http, $timeout) {
        return {
            getDataList: getDataList,
            getDataById: getDataById,
            deleteDataById: deleteDataById,
            addOrUpdateData: addOrUpdateData
        };


        function getDataList(entity) {
            // simulate delay of getting data from backend
            return $timeout(function () {
                return $http.get(entity.url).then(function (result) {
                    return result.data;
                });
            }, 200);

            /* return $http.get(entity.url).then(function (result) {
             return result.data;
             });*/
        }

        function getDataById(entity, id) {
            return $http.get(entity.url + '/' + id).then(function (result) {
                return result.data;
            });
        }

        function deleteDataById(entity, id) {
            return $http.delete(entity.url + '/' + id).then(function (result) {
                return result.data;
            });
        }

        function addOrUpdateData(entity, object) {
            return $http.post(entity.url,object).then(function (result) {
                return result.data;
            });
        }

    }
})(angular.module('appNorthwind'));

