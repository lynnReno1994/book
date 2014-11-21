'use strict';

book.controller('ListCtrl', ['$scope', '$filter', 'books',
    function ($scope, $filter, books) {
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

        //书名搜索关键词，主要用于更新books数组
        $scope.bookFilterdInput = '';

        $scope.pageCount = function () {
            if ($scope.books) {
                //根据用户输入来过滤更新数组，主要用来更新页数
                $scope.updatePage = $filter('bookname')($scope.books, $scope.bookFilterdInput);
                //向上取整求出总页数
                return Math.ceil($scope.updatePage.length / $scope.itemsPerPage);
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

        $scope.$watch('bookFilterdInput', function () {
            //console.log('change');
            if ($scope.pageCount()<=$scope.currentPage) {
                $scope.currentPage = 0;
            }
        })

        $scope.$watch('itemsPerPage', function () {
            //console.log('change');
            if ($scope.pageCount()<=$scope.currentPage) {
                $scope.currentPage = 0;
            }
        })
    }
]);

book.controller('ViewCtrl', ['$scope', '$routeParams', 'books',
    function ($scope, $routeParams, books) {
        //用指令代替了这块功能，该controller和directiveCtrl完全相同
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