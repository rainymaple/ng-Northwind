(function (app) {

    app.controller("userAdminCtrl", ["$scope", "repositoryService", "dbEntityConfig", "$state", "$stateParams", userAdminCtrl]);

    function userAdminCtrl($scope, repositoryService, dbEntityConfig, $state, $stateParams) {

        var _entityType = dbEntityConfig.entities.user;

        resetUser();

        $scope.hasUser = false;
        $scope.deleteUser = function (id) {
            deleteUser(id);
        };

        $scope.isEditMode = ($state.current.name !== "admin.user");

        if ($scope.isEditMode && $stateParams.id) {
            getUserById($stateParams.id);
            $scope.title = "Edit User";
        } else {
            $scope.title = "Add User";
        }

        getUsers();

        $scope.saveUser = function (formUser) {
            if (!formUser.$invalid) {

                repositoryService.addOrUpdateData(_entityType, $scope.user)
                    .success(function (data) {
                        if (data.error) {
                            toastr.warning(data.error.message);
                        } else {
                            getUsers();
                            resetUser();
                            if ($scope.isEditMode) {
                                $state.go("admin.user");
                            }
                            toastr.success("Save Successful");
                        }
                    })
                    .error(function (data, status, headers, config) {
                        //logService.logError(data);
                    });
            } else {
                toastr.warning("Please correct the validation errors");
            }
        };


        function getUsers() {
            repositoryService.getDataList(_entityType)
                .then(function (data) {
                    if (data && data.data) {
                        $scope.userList = data.data;
                        $scope.hasUser = $scope.userList.length > 0;
                    }});
 /*               .success(function (data) {
                    if (data && data.data) {
                        $scope.userList = data.data;
                        $scope.hasUser = $scope.userList.length > 0;
                    }
                }).error(function (data, status, headers, config) {
                    logService.logError(data);
                });*/
        }

        function getUserById(id) {
            repositoryService.getDataById(_entityType, id).success(function (data) {
                if (data && data.data) {
                    $scope.user = data.data;
                    $scope.user.password = "";
                }
            }).error(function (data, status, headers, config) {
                //logService.logError(data);
            });
        }

        function deleteUser(id) {
            repositoryService.deleteDataById(_entityType, id).success(function (data) {
                if (data && data.data) {
                    $scope.userList = data.data;
                    $scope.hasUser = $scope.userList.length > 0;
                }
            }).error(function (data, status, headers, config) {
                //logService.logError(data);
            });
        }

        function resetUser() {
            $scope.user = {userName: "", password: "", role: "User"};
        }
    }


})(angular.module('appNorthwind'));