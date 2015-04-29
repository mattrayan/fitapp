(function() {
    var app = angular.module('profile', []);

    app.controller('profileCtrl', function($scope, $http, $cookieStore) {
        $scope.$parent.session();

        $scope.charsLeft = 140;

        $scope.processLength = function() {
            $scope.charsLeft = 140 - $scope.profileForm.wallpost.length;

            if ($scope.profileForm.wallpost.length >= 140) {
                $scope.profileForm.wallpost = $scope.profileForm.wallpost.substring(0, 140); 
                $scope.charsLeft = 0;
            }
        }

        $scope.tab = 1;

        $scope.setTab = function(index) {
            $scope.tab = index;
            $scope.accountSuccess = false;
            $scope.accountError = false;
        };

        $scope.isSelected = function(index) {
            return $scope.tab === index;
        };

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