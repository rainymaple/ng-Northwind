(function(app){
    app.factory('repositoryService',['$http',repositoryService]);

    // entity is defined in dbEntityService

    function repositoryService($http) {
        return {
            getDataList: getDataList,
            getDataById: getDataById
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
    }
})(angular.module('appNorthwind'));

