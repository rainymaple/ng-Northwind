(function () {
    "use strict";

    var _users = [];    // populated below

    var _currentUser = {};

    var error401 = 'You are not authenticated to access this resource.';
    var error403 = "You are not authorized to access this resource.";


    var app = angular.module("northwindDbMock", ["ngMockE2E"]);

    app.run(function ($httpBackend, NorthWindDb) {

        var northwindDb = NorthWindDb.getNorthwindDb();


        // pass through any local request
        $httpBackend.whenGET(/wwwroot/).passThrough();

        var requests = {
            user: {
                endpoint: "/api/user",
                entities: 'Users',
                idField: 'id',
                roles: ['role-admin']
            },
            employee: {
                endpoint: "/api/employee",
                entities: 'Employees',
                idField: 'EmployeeID',
                roles: ['role-admin', 'role-user', 'role-orderuser']
            },
            category: {
                endpoint: "/api/category",
                entities: 'Categories',
                idField: 'CategoryID',
                roles: ['role-admin', 'role-user', 'role-orderuser']
            },
            customer: {
                endpoint: "/api/customer",
                entities: 'Customers',
                idField: 'CustomerID',
                roles: ['role-admin', 'role-user', 'role-orderuser']
            },
            shipper: {
                endpoint: "/api/shipper",
                entities: 'Shippers',
                idField: 'ShipperID',
                roles: ['role-admin', 'role-user', 'role-orderuser']
            },
            supplier: {
                endpoint: "/api/supplier",
                entities: 'Suppliers',
                idField: 'SupplierID',
                roles: ['role-admin', 'role-user', 'role-orderuser']
            },
            territory: {
                endpoint: "/api/territory",
                entities: 'Territories',
                idField: 'TerritoryID',
                roles: ['role-admin', 'role-user', 'role-orderuser']
            },
            order: {
                endpoint: "/api/order",
                entities: 'Orders',
                idField: 'OrderID',
                roles: ['role-admin', 'role-user', 'role-orderuser']
            },
            orderDetails: {
                endpoint: "/api/orderDetails",
                entities: 'OrderDetails',
                idField: 'OrderID',
                roles: ['role-admin', 'role-user', 'role-orderuser']
            },
            newOrder: {
                endpoint: "/api/newOrder",
                entities: 'Orders',
                idField: 'OrderID',
                roles: ['role-admin', 'role-orderuser']
            },
            product: {
                endpoint: "/api/product",
                entities: 'Products',
                idField: 'ProductID',
                roles: ['role-admin', 'role-user', 'role-orderuser']
            },
            productByCategoryId: {
                endpoint: '/api/productByCategoryId',
                entities: 'Products',
                idField: 'ProductID',
                filterId: 'CategoryID',
                roles: ['role-admin', 'role-user', 'role-orderuser']
            }
        };

        // populate the _users array
        angular.forEach(northwindDb[requests.user.entities], function (user) {
            _users.push({
                username: user.username,
                password: user.password,
                roles: user.roles,
                get token() {
                    return createToken(this.username, this.password, this.roles);
                }
            })
        });


        angular.forEach(requests, function (request) {

            /* -- e.g. url = "api/employee" --*/
            $httpBackend.whenGET(request.endpoint).respond(function (method, url, data, headers) {
                if (!isAuthenticated(headers)) {
                    return [401, {status: 'error 401'}, headers, error401]
                }
                if (!isAuthorized(request.roles)) {
                    return [403, {status: 'error 403'}, headers, error403]
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

            var loggedInUser = getLoggedInUser(credential.username, credential.password);
            if (!loggedInUser) {
                return [401, {status: 'error 401'}, headers, 'The user name or password is incorrect']
            }

            var tokenData = {
                access_token: loggedInUser.token
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

    function getLoggedInUser(username, password) {
        var loggedInUser = {};
        if (username && password) {
            for (var i = 0; i < _users.length; i++) {
                if (_users[i].username === username && _users[i].password === password) {
                    loggedInUser = _users[i];
                    break;
                }
            }
        }

        return loggedInUser;
    }

    function isAuthenticated(headers) {
        var loggedIn = false;
        var token = '';
        if (headers && headers.Authorization) {
            for (var i = 0; i < _users.length; i++) {
                token = _users[i].token;
                if (headers.Authorization.indexOf(token) >= 0) {
                    loggedIn = true;
                    _currentUser = decryptToken(token);
                    break;
                }
            }
        }
        return loggedIn;
    }

    function isAuthorized(requiredRoles) {
        var isAuthorized = false;
        var currentRoles = _currentUser.roles.split(',');
        for (var i = 0; i < currentRoles.length; i++) {
            if (requiredRoles.indexOf(currentRoles[i]) >= 0) {
                isAuthorized = true;
                break;
            }
        }
        return isAuthorized;
    }

    function createToken(username, password, roles) {
        var roleString = '';
        if (roles) {
            roleString = '&roles=' + roles.trim();
        }
        return 'username=' + username.trim() + '&password=' + password.trim() + roleString;
    }

    function decryptToken(token) {
        var profile = parseQueryString(token);
        return profile;
    }
})();
