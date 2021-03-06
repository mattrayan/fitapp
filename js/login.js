(function() {
    var app = angular.module('login', []);

    app.controller('loginCtrl', ['$scope', '$http', '$cookieStore', '$location', function($scope, $http, $cookieStore, $location) {
        $scope.loginForm = {};

        // If already logged-in, re-direct
        if ($scope.$parent.user) {
            $scope.$parent.go('/profile');
        }

        $scope.login = function() {
            $scope.loginError = false;

            var payload = {
                username: $scope.loginForm.username,
                password: $scope.loginForm.password
            };

            $http.post($scope.$parent.serverUrl + '/api/login/', payload).success(function(data) {
                if (data === "No record found") {
                    $scope.loginError = "Username or password incorrect";
                } else if (data[0].username === $scope.loginForm.username) {
                    $scope.$parent.user = data[0].username;
                    $cookieStore.put("fitdb.user", data[0].username);
                    $scope.$parent.go('/profile');
                } else {
                    $scope.loginError = "Error, could not login at this time";
                }

                $scope.loginForm = {};
            });
        };
    }]);

})();