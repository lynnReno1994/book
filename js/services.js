'use strict';

book.factory('books', ['$http', function ($http) {
    var url = "api/book";
    var factory = {};

    factory.all = function () {
        var books = $http.get(url).then(function (resp) {
            return resp.data.book;
        });
        return books;
    };

    factory.get = function (id) {
        var book = $http.get(url + '/' + id).then(function (resp) {
            return resp.data;
        });
        return book;
    };

    factory.add = function(book) {
        $http.post(url, book).then(function(resp){
            return resp;
        });
    };

    factory.update = function(book) {
        $http.put(url + '/' + book.id, book).then(function(resp){
            return resp;
        });
    };

    factory.delete = function(id) {
        $http.delete(url + '/' + id).then(function(resp){
            return resp;
        });
    };

    return factory;
}]);