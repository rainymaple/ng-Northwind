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
                customer: {
                    name: 'customer',
                    url: getUrl('customer')
                },
                shipper: {
                    name: 'shipper',
                    url: getUrl('shipper')
                },
                supplier: {
                    name: 'supplier',
                    url: getUrl('supplier')
                },
                territory: {
                    name: 'territory',
                    url: getUrl('territory')
                },
                product: {
                    name: 'product',
                    url: getUrl('product')
                },
                order: {
                    name: 'order',
                    url: getUrl('order')
                },
                orderDetails: {
                    name: 'orderDetails',
                    url: getUrl('orderDetails')
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
