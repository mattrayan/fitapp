(function() {
    var app = angular.module('fitness', ['ngCookies', 'ngRoute', 'login', 'register', 'profile', 'account', 'directives']);

    app.controller('appCtrl', function($scope, $cookieStore, $location) {
        $scope.serverUrl = "http://localhost:3000";

        // Check if logged in
        $scope.session = function() {
            if (!$scope.user) {
                $scope.user = $cookieStore.get("fitdb.user");
            }
        };

        $scope.session();


        $scope.go = function(path) {
            $location.path(path);
        };

        $scope.logout = function() {
            $scope.user = false;
            $cookieStore.remove("fitdb.user");
            $scope.go('/');
        };
    });

    // Setup routes
    app.config(function($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: './templates/login.html',
            controller: 'loginCtrl'
        });
        
        $routeProvider.when('/register', {
            templateUrl: './templates/register.html',
            controller: 'registerCtrl'
        });

        $routeProvider.when('/profile', {
            templateUrl: './templates/profile.html',
            controller: 'profileCtrl'
        });

        $routeProvider.when('/account', {
            templateUrl: './templates/account.html',
            controller: 'accountCtrl'
        });

        $routeProvider.otherwise({
            redirectTo: '/'
        });
    });

})();