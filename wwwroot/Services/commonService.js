(function (app) {
    app.factory('commonService', ['$modal', '$http', 'config', 'currentUser', commonService]);
    function commonService($modal, $http, config, currentUser) {
        return {
            showProductModal: showProductModal,
            oauth: {
                login: login,
                logout:logout
            }
        };

        // Service Functions

        function showProductModal(productId) {
            var modalInstance = $modal.open({
                templateUrl: 'wwwroot/Views/Product/productModal.html',
                controller: 'productModalCtrl',
                resolve: {
                    productId: function () {
                        return productId;
                    }
                }
            });

            return modalInstance.result;
            /*modalInstance.result.then(function (obj) {
             // return value from $modalInstance.close(obj)
             }, function () {
             });*/
        }


        function login(username, password) {
            var httpConfig = {
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            };
            var data = formEncode({
                username: username,
                password: password,
                grant_type: "password"
            });
            return $http.post(config.loginEndpoint, data, httpConfig).then(function (response) {
                currentUser.setProfile(username, response.data.access_token);
                return {
                    username: username,
                    token: response.data.access_token
                }
            }, function (data) {
                return null;
            });
        }

        function logout(){
            currentUser.setProfile('','');
        }

        function formEncode(data) {
            var pairs = [];
            for (var name in data) {
                pairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }
            return pairs.join('&').replace(/%20/g, '+');
        }
    }
})(angular.module('appNorthwind'));
