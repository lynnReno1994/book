'use strict';

var book = angular.module('book', []);

book.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            controller: 'ListCtrl',
            templateUrl: 'views/list.html'
        }).when('/edit/:id', {
            controller: 'EditCtrl',
            templateUrl: 'views/edit.html'
        }).when('/view/:id', {
            controller: 'ViewCtrl',
            templateUrl: 'views/view.html'
        }).when('/new', {
            controller: 'NewCtrl',
            templateUrl: 'views/edit.html'
        }).otherwise({
            redirectTo: '/'
        });
}]);