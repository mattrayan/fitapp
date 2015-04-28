(function() {
    var app = angular.module('register', []);

    app.controller('registerCtrl', function($scope, $http, $cookieStore, $location) {
        $scope.registerForm = {};

        $scope.signUp = function() {
            $scope.registerError = false;

            if (typeof $scope.registerForm.username === "undefined") {
                $scope.registerError = "Please enter a username";
            } else if (typeof $scope.registerForm.email === "undefined") {
                $scope.registerError = "Please enter a valid email address";
            } else if ($scope.registerForm.password !== $scope.registerForm.passwordConfirm) {
                $scope.registerError = "Passwords do not match or too short";
            } else if ((typeof $scope.registerForm.password === "undefined") || (typeof $scope.registerForm.passwordConfirm === "undefined")) {
                $scope.registerError = "Please enter password";
            } else {
                if (!$scope.registerError) {
                    $http.post($scope.$parent.serverUrl + '/api/register/' + $scope.registerForm.username + '/' + $scope.registerForm.email + '/' + $scope.registerForm.password).success(function(data) {
                        if (data === "Username conflict") {
                            $scope.registerError = "Username is already taken";
                        } else if (data === "Email conflict") {
                            $scope.registerError = "Email is already in use";
                        } else if (data[0].username === $scope.registerForm.username) {
                            $cookieStore.put("fitdb.user", data[0].username);
                            $scope.$parent.go('/account');
                        } else {
                            $scope.registerError = "Error, could not register at this time";
                        }
                    });
                }
            }
        };
    });

})();