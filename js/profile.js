(function() {
    var app = angular.module('profile', []);

    app.controller('profileCtrl', function($scope, $http, $cookieStore) {
        $scope.userForm = {};
        $scope.userForm.goal = "Build Muscle";

        $scope.statsForm = {};
        $scope.statsForm.age = 19;
        $scope.statsForm.weight = 200;
        $scope.statsForm.height = 6;
        $scope.statsForm.type = "Ectomorph"

        $scope.userEdit = false;
        $scope.statsEdit = false;
        $scope.liftsEdit = false;

        $scope.$parent.session();

        $scope.charsLeft = 140;

        $scope.processLength = function() {
            $scope.charsLeft = 140 - $scope.profileForm.wallpost.length;
        }

        $scope.toggleEdit = function(section) {
            switch (section) {
                case 'user':
                    $scope.userEdit = !$scope.userEdit;
                    break;
                case 'stats':
                    $scope.statsEdit = !$scope.statsEdit;
                    break;
                case 'lifts':
                    $scope.liftsEdit = !$scope.liftsEdit;
                    break;
            }
        }
    });

})();