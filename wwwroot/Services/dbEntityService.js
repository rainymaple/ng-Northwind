(function (app) {
    app.factory('dbEntityService', [dbEntityService]);

    var apiBase = '/api/';

    function dbEntityService() {
        return {
            entities: {
                category: {
                    name: 'category',
                    url: getUrl('category')
                },
                employee:{
                    name:'employee',
                    url: getUrl('employee')
                }
            }
        }
    }

    function getUrl(entityName) {
        return apiBase + entityName;
    }

})(angular.module('appNorthwind'));
