(function(app){

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
                .state("employeeList", {
                    url: "/employees",
                    templateUrl: "wwwroot/Views/Employee/employeeList.html"
                });
        }
    ]);
})(angular.module('appNorthwind'));