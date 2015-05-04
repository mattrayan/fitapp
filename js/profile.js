(function() {
    var app = angular.module('profile', []);

    app.controller('profileCtrl', ['$scope', '$http', '$cookieStore', function($scope, $http, $cookieStore) {
        $scope.$parent.session();

        $scope.profileForm = {};
        $scope.wallposts = [];
        $scope.charsLeft = 400;

        $scope.processLength = function() {
            $scope.charsLeft = 400 - $scope.profileForm.wallpost.length;

            if ($scope.profileForm.wallpost.length >= 400) {
                $scope.profileForm.wallpost = $scope.profileForm.wallpost.substring(0, 400);
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

        $scope.post = function() {
            if ($scope.profileForm.wallpost.length > 0) {
                $scope.wallposts.push(
                    {
                        message: $scope.profileForm.wallpost,
                        date: new Date()
                    }
                );
                $scope.profileForm.wallpost = "";
                $scope.charsLeft = 400;
            }
        }
    }]);

})();