'use strict';

// Create a module for our core AMail services
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

book.controller('ListCtrl', ['$scope', 'books',
    function ($scope, books) {
        $scope.loadList = function () {
            books.all().then(function (books) {
                $scope.books = books;
            });
        };

        //init load data
        $scope.loadList();

        $scope.deleteBook = function ($index, id) {
            if (confirm("确定删除？")) {
                books.delete(id);
                $scope.books.splice($index, 1);
            }
        };
    }
]);

book.controller('ViewCtrl', ['$scope', '$routeParams', 'books',
    function ($scope, $routeParams, books) {
        books.get($routeParams.id).then(function (book) {
            $scope.book = book;
        });
    }
]);

book.controller('EditCtrl', ['$scope', '$routeParams', '$location', 'books',
    function ($scope, $routeParams, $location, books) {
        books.get($routeParams.id).then(function (book) {
            $scope.book = book;
        });

        $scope.new = function (book) {
            books.update(book);
            $location.path('/');
        };
    }
]);

book.controller('NewCtrl', ['$scope', '$location', 'books',
    function ($scope, $location, books) {
        $scope.new = function (book) {
            books.add(book);
            $location.path('/');
        };
    }
]);