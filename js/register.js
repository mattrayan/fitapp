(function() {
    var app = angular.module('register', []);

    app.controller('registerCtrl', ['$scope', '$http', '$cookieStore', '$location', function($scope, $http, $cookieStore, $location) {
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
                var payload = {
                    username: $scope.registerForm.username,
                    email: $scope.registerForm.email,
                    password: $scope.registerForm.password
                };

                if (!$scope.registerError) {
                    $http.post($scope.$parent.serverUrl + '/api/register/', payload).success(function(data) {
                        if (data === "Username conflict") {
                            $scope.registerError = "Username is already taken";
                        } else if (data === "Email conflict") {
                            $scope.registerError = "Email is already in use";
                        } else if (data[0].username === $scope.registerForm.username) {
                            $cookieStore.put("fitdb.user", data[0].username);
                            $scope.$parent.go('/');
                        } else {
                            $scope.registerError = "Error, could not register at this time";
                        }
                    });
                }
            }
        };
    }]);

})();