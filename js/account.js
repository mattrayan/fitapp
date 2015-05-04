(function() {
    var app = angular.module('account', []);

    app.controller('accountCtrl', ['$scope', '$http', '$cookieStore', '$location', '$timeout', function($scope, $http, $cookieStore, $location, $timeout) {
        $scope.emailForm = {};
        $scope.passwordForm = {};

        $scope.$parent.session();

        $http.get($scope.$parent.serverUrl + '/api/info/users/' + $scope.$parent.user).success(function(data) {
            if (data === "No record found") {
                $scope.accountError = "Account not found";
            } else if (data[0].username === $scope.$parent.user) {
                $scope.emailForm.email = data[0].email;
            } else {
                $scope.accountError = "Error, could not retrieve account";
            }
        });

        $scope.tab = 1;

        $scope.setTab = function(index) {
            $scope.tab = index;
            $scope.accountSuccess = false;
            $scope.accountError = false;
        };

        $scope.isSelected = function(index) {
            return $scope.tab === index;
        };

        $scope.updateEmail = function() {
            if (typeof $scope.emailForm.email === "undefined") {
                $scope.accountError = "Please enter a valid email";
            } else {
                $http.put($scope.$parent.serverUrl + '/api/emailupdate/' + $scope.$parent.user + '/' + $scope.emailForm.email).success(function(data) {
                    if (data === "Success") {
                        $scope.accountSuccess = true;
                        $scope.accountError = false;
                    } else if (data === "Email conflict") {
                        $scope.accountError = "Email is already in use";
                        $scope.accountSuccess = false;
                    } else {
                        $scope.accountError = "Error, could not update email";
                    }
                });
            }
        };

        $scope.updatePassword = function() {
            if ($scope.passwordForm.new !== $scope.passwordForm.confirm) {
                $scope.accountError = "Passwords do not match";
            } else if ((typeof $scope.passwordForm.new === "undefined") || (typeof $scope.passwordForm.confirm === "undefined")) {
                $scope.accountError = "Please enter password";
            } else {
                $http.put($scope.$parent.serverUrl + '/api/passwordupdate/' + $scope.$parent.user + '/' + $scope.passwordForm.old + '/' + $scope.passwordForm.new).success(function(data) {
                    if (data === "Success") {
                        $scope.accountSuccess = true;
                        $scope.accountError = false;
                    } else if (data === "Password conflict") {
                        $scope.accountError = "Old password is incorrect"
                    } else {
                        $scope.accountError = "Error, could not update password";
                    }

                    $scope.passwordForm = {};
                });
            }
        };

        $scope.deleteAccount = function() {
            $http.delete($scope.$parent.serverUrl + '/api/deleteaccount/' + $scope.$parent.user).success(function(data) {
                if (data === "Success") {
                    $scope.accountSuccess = true;
                    $scope.accountError = false;

                    $timeout(function(){
                        $scope.$parent.logout();
                    }, 2000);
                } else {
                    $scope.accountError = "Error, could not delete account";
                }
            });
        };

    }]);

})();