(function () {
    "use strict";
    var app = angular.module("appNorthwind", [
        "ui.router", "ui.mask", "ui.bootstrap", "angularCharts",'ui.grid'
        ,'northwindDbMock'
    ]);

    var productListCtrl = function (productResource) {
        var vm = this;

        productResource.query(function (data) {
            vm.products = data;
        });

    };
    app.controller("productListCtrl", ["productResource", productListCtrl]);

    var productDetailCtrl = function ($scope, product) {
        $scope.product = product;

        $scope.title = "Product Detail: " + product.productName;
    };
    app.controller("productDetailCtrl", ["$scope", "product", productDetailCtrl]);


    var productEditCtrl = function ($scope, product, $state) {
        $scope.product = angular.copy(product);
        $scope.tagNotChanged = true;

        if ($scope.product && $scope.product.productId) {
            $scope.title = "Product Detail: " + $scope.product.productName;
        } else {
            $scope.title = "New Product";
        }
        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = !$scope.opened;
        };
        $scope.submit = function (submitForm) {
            // https://docs.angularjs.org/api/ngResource/service/$resource
            // When the data is returned by $resource,
            // the object is an instance of the resource class.
            // The actions save, remove and delete are available on it
            // as methods with the $ prefix.

            if (submitForm.$name == "productForm" && !submitForm.$dirty || submitForm.$name == "productTagsForm" && $scope.tagNotChanged) {
                submitForm.$setValidity();
                return;
            }

            if (!submitForm.$invalid) {
                $scope.product.$save(function (data) {
                    toastr.success("Save Successful");
                    $scope.tagNotChanged = true;
                });
            } else {
                toastr.warning("Please correct the validation errors");
            }
        };
        $scope.cancel = function () {
            // The ui-router provides the $state.go(stateName) for navigation
            $state.go("productList");
        };
        $scope.addTags = function (tags) {
            if (tags) {
                var array = tags.split(',');
                if (!$scope.product.tags) {
                    $scope.product.tags = [];
                }
                angular.forEach(array, function (v, i) {
                    if ($scope.product.tags.indexOf(v) == -1) {
                        $scope.product.tags.push(v);
                    }
                });
            } else {
                toastr.warning("please enter one or more tags");
            }
            checkTagsChange();
        };
        $scope.removeTag = function (tag) {
            angular.forEach($scope.product.tags, function (v, i) {
                if (v === tag) {
                    $scope.product.tags.splice(i, 1);
                    return false;
                }
            });
            checkTagsChange();
        };

        function checkTagsChange() {
            $scope.tagNotChanged = angular.equals($scope.product.tags, product.tags);
        }
    };
    app.controller("productEditCtrl", ["$scope", "product", "$state", productEditCtrl]);

    var priceAnalyticsCtrl = function (products, $scope) {
        $scope.title = "Price Analytics";
    }
    app.controller("priceAnalyticsCtrl", ["products", "$scope", priceAnalyticsCtrl]);


    function getProductById(productResource, $stateParams) {
        var productId = $stateParams.productId;
        return productResource.get({
            productId: productId
        }).$promise;
    }

    app.config(["$stateProvider", "$urlRouterProvider",

        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/"); // default view

            $stateProvider
                .state("home", {
                    url: "/",
                    templateUrl: "wwwroot/Views/Home/home.html"
                })

                .state("categoryList", {
                    url: "/categories",
                    templateUrl: "wwwroot/Views/Category/categoryList.html"
                })
                .state("productList", {
                    url: "/products",
                    templateUrl: "../../productList.html",
                    controller: "productListCtrl as vm"
                })
                .state("productDetail", {
                    url: "/products/:productId",
                    templateUrl: "../../productDetail.html",
                    controller: "productDetailCtrl",
                    resolve: {
                        productResource: "productResource",
                        product: getProductById
                    }
                })
                .state("productEdit", {
                    abstract: true, // parent state should be abstract
                    url: "/products/edit/:productId",
                    templateUrl: "../../productEdit.html",
                    controller: "productEditCtrl",
                    resolve: {
                        productResource: "productResource",
                        product: getProductById
                    }
                })
                .state("productEdit.info", {
                    url: "/info",
                    templateUrl: "../../productEditInfo.html"
                })
                .state("productEdit.price", {
                    url: "/price",
                    templateUrl: "../../productEditPrice.html"
                })
                .state("productEdit.tags", {
                    url: "/tags",
                    templateUrl: "../../productEditTags.html"
                })
                .state("priceAnalytics", {
                    url: "/priceAnalytics",
                    templateUrl: "../../priceAnalytics.html",
                    controller: "PriceAnalyticsCtrl",
                    resolve: {
                        productResource: "productResource",
                        products: function (productResource) {
                            return productResource.query().$promise;
                        }
                    }
                })
                .state("productGridList", {
                    url: "/productGridList",
                    templateUrl: "../../productGridList.html",
                    controller: "ProductGridCtrl",
                    resolve: {
                        productResource: "productResource",
                        products: function (productResource) {
                            return productResource.query().$promise;
                        }
                    }
                });
        }
    ]);
    console.log("app running!");
})();