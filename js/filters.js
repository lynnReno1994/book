'use strict';

book.filter('paging', function () {
    return function (input, start) {
        if (input) {
            return input.slice(start);
        }
    };
})
;