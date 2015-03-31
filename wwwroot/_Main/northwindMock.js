(function () {
    "use strict";

    var app = angular.module("northwindDbMock", ["ngMockE2E"]);
    app.run(function ($httpBackend,NorthWindDb) {

        var northwindDb = NorthWindDb.getNorthwindDb();

        // pass through any local request
        $httpBackend.whenGET(/wwwroot/).passThrough();

        var requests = {
            employee: {
                endpoint: "/api/employee",
                entities: 'Employees',
                idField: 'EmployeeID'
            },
            category: {
                endpoint: "/api/category",
                entities: 'Categories',
                idField: 'CategoryID'
            },
            customer: {
                endpoint: "/api/customer",
                entities: 'Customers',
                idField: 'CustomerID'
            },
            shipper: {
                endpoint: "/api/shipper",
                entities: 'Shippers',
                idField: 'ShipperID'
            },
            supplier: {
                endpoint: "/api/supplier",
                entities: 'Suppliers',
                idField: 'SupplierID'
            },
            territory: {
                endpoint: "/api/territory",
                entities: 'Territories',
                idField: 'TerritoryID'
            },
            order: {
                endpoint: "/api/order",
                entities: 'Orders',
                idField: 'OrderID'
            },
            orderDetails: {
                endpoint: "/api/orderDetails",
                entities: 'Order_Details',
                idField: 'OrderID'
            },
            product: {
                endpoint: "/api/product",
                entities: 'Products',
                idField: 'ProductID'
            },
            productByCategoryId: {
                endpoint: '/api/productByCategoryId',
                entities: 'Products',
                idField: 'ProductID',
                filterId: 'CategoryID'
            }
        };


        angular.forEach(requests, function (request) {

            /* -- e.g. url = "api/employee" --*/
            $httpBackend.whenGET(request.endpoint).respond(northwindDb[request.entities]);

            /* -- e.g. url = "api/employee/2" --*/
            var editingRegex = new RegExp(request.endpoint + "/[0-9][0-9]*", '');

            $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {

                var entity = []; // return this if not found

                var filterId = request.filterId || request.idField;

                var entities = northwindDb[request.entities];
                var parameters = url.split('/');
                var length = parameters.length;
                var id = parameters[length - 1];

                if (id > 0) {
                    for (var i = 0; i < entities.length; i++) {
                        if (entities[i][filterId] == id) {
                            entity.push(entities[i]); // find the entity with this id
                        }
                    }
                }
                return [200, entity, {}];
            });

            /* -- e.g. post: url = "api/employee" --*/

            $httpBackend.whenPOST(request.endpoint).respond(function (method, url, data) {

                // deserialize the posted data
                var postData = angular.fromJson(data);

                var entities = northwindDb[request.entities];

                if (!postData[request.idField]) {
                    // new entity
                    postData[request.idField] = entities[entities.length - 1][request.idField] + 1;
                    northwindDb[request.entities].push(postData);
                } else {
                    // update entity
                    for (var i = 0; i < entities.length; i++) {
                        if (entities[i][request.idField] == postData[request.idField]) {
                            entities[i] = postData;
                            break;
                        }
                    }
                }
                return [200, postData, {}];
            });
        });


    });

})();
