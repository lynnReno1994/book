'use strict';

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

        //设置分页
        //初始化分页参数
        $scope.itemsPerPage = 10;
        $scope.currentPage = 0;

        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };

        $scope.prevPageDisabled = function () {
            return $scope.currentPage == 0;
        };

        $scope.pageCount = function () {
            if ($scope.books) {
                //向上取整求出总页数
                return Math.ceil($scope.books.length / $scope.itemsPerPage);
            } else {
                return false;
            }
        };

        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pageCount()) {
                $scope.currentPage++;
            }
        };

        $scope.nextPageDisabled = function () {
            return $scope.currentPage + 1 == $scope.pageCount();
        };
    }
]);

book.controller('ViewCtrl', ['$scope', '$routeParams', 'books',
    function ($scope, $routeParams, books) {
        //books.get($routeParams.id).then(function (book) {
        //    $scope.book = book;
        //});
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

book.controller('directiveCtrl', ['$scope', '$routeParams', 'books',
    function ($scope, $routeParams, books) {
        books.get($routeParams.id).then(function (book) {
            $scope.book = book;
        });
    }
]);