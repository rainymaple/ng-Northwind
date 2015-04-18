(function () {
    "use strict";

    var _users = [];    // populated below

    var error401 = 'You are not authenticated to access this resource.';

    var app = angular.module("northwindDbMock", ["ngMockE2E"]);

    app.run(function ($httpBackend, NorthWindDb) {

        var northwindDb = NorthWindDb.getNorthwindDb();

        // pass through any local request
        $httpBackend.whenGET(/wwwroot/).passThrough();

        var requests = {
            user: {
                endpoint: "/api/user",
                entities: 'Users',
                idField: 'id'
            },
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
                entities: 'OrderDetails',
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

        // populate the _users array
        angular.forEach(northwindDb[requests.user.entities], function (user) {
            _users.push({
                username: user.username,
                password: user.password,
                role: user.role,
                get token() {
                    return createToken(this.username, this.password);
                }
            })
        });


        angular.forEach(requests, function (request) {

            /* -- e.g. url = "api/employee" --*/
            $httpBackend.whenGET(request.endpoint).respond(function (method, url, data, headers) {
                if (!isAuthenticated(headers)) {
                    return [401, {status: 'error 401'}, headers, error401]
                }
                return [200, northwindDb[request.entities], {}];
            });

            /* -- e.g. url = "api/employee/2" --*/
            var editingRegex = new RegExp(request.endpoint + "/[0-9][0-9]*", '');

            $httpBackend.whenGET(editingRegex).respond(function (method, url, data, headers) {

                if (!isAuthenticated(headers)) {
                    return [401, {status: 'error 401'}, headers, error401]
                }

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

            $httpBackend.whenPOST(request.endpoint).respond(function (method, url, data, headers) {

                if (!isAuthenticated(headers)) {
                    return [401, {status: 'error 401'}, headers, error401]
                }

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

        $httpBackend.whenPOST('/api/login').respond(function (method, url, data, headers) {

            // deserialize the posted data
            var credential = parseQueryString(data);

            if (!isAuthenticated(null, credential.username, credential.password)) {
                return [401, {status: 'error 401'}, headers, 'The user name or password is incorrect']
            }

            var tokenData = {
                access_token: createToken(credential.username, credential.password)
            };

            return [200, tokenData, {}];
        });
    });

    function parseQueryString(queryString) {
        var params = {}, queries, temp, i, l;

        // Split into key/value pairs
        queries = queryString.split("&");

        // Convert the array of strings into an object
        for (i = 0, l = queries.length; i < l; i++) {
            temp = queries[i].split('=');
            params[temp[0]] = temp[1];
        }

        return params;
    }

    function isAuthenticated(headers, username, password) {
        var loggedIn = false;
        if (headers && headers.Authorization) {
            for (var i = 0; i < _users.length; i++) {
                if (headers.Authorization.indexOf(_users[i].token) >= 0) {
                    loggedIn = true;
                    break;
                }
            }
        }
        if (username && password) {
            var token = createToken(username, password);
            for (var j = 0; j < _users.length; j++) {
                if (token.indexOf(_users[j].token) >= 0) {
                    loggedIn = true;
                    break;
                }
            }
        }
        return loggedIn;
    }

    function createToken(username, password) {
        return username.trim() + password.trim();
    }
})();
