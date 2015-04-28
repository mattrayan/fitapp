(function() {
    var app = angular.module('directives', []);

    app.directive('header', function() {
        return {
            restrict: 'E',
            templateUrl: './templates/header.html'
        };
    });

})();