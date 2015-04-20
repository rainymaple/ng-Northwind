(function (app) {

    app.config(["$stateProvider", "$urlRouterProvider",

        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/login"); // default view

            $stateProvider
                .state("login", {
                    url: "/login",
                    templateUrl: "wwwroot/Views/Authentication/login.html"
                })
                .state("error401", {
                    url: "/error401",
                    templateUrl: "wwwroot/Views/Authentication/error401.html"
                })
                .state("error403", {
                    url: "/error403",
                    templateUrl: "wwwroot/Views/Authentication/error403.html"
                })
                .state("home", {
                    url: "/",
                    templateUrl: "wwwroot/Views/Home/home.html"
                })
                .state("employeeList", {
                    url: "/employees",
                    templateUrl: "wwwroot/Views/Employee/employeeList.html"
                })
                .state("customerList", {
                    url: "/customers",
                    templateUrl: "wwwroot/Views/Customer/customerList.html"
                })
                .state("shipperList", {
                    url: "/shippers",
                    templateUrl: "wwwroot/Views/Shipper/shipperList.html"
                })
                .state("supplierList", {
                    url: "/suppliers",
                    templateUrl: "wwwroot/Views/Supplier/supplierList.html"
                })
                .state("territoryList", {
                    url: "/territories",
                    templateUrl: "wwwroot/Views/Territory/territoryList.html"
                })
                .state("categoryList", {
                    url: "/categories",
                    templateUrl: "wwwroot/Views/Category/categoryList.html"
                })
                .state("productList", {
                    url: "/products",
                    templateUrl: "wwwroot/Views/Product/productList.html"
                })
                .state("orderList", {
                    url: "/orders",
                    templateUrl: "wwwroot/Views/Order/orderList.html"
                })
                .state("orderReport", {
                    url: "/OrderReport",
                    templateUrl: "wwwroot/Views/Report/orderReport.html"
                })
                .state("userAdmin", {
                    url: "/users",
                    templateUrl: "wwwroot/Views/User/userAdmin.html"
                });
        }
    ]);
})(angular.module('appNorthwind'));