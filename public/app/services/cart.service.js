(function(){
    "use strict";

    angular
        .module("Main")
        .factory("cartService", cartService);

    function cartService($http) {

        var getCart = function() {
            return $http.get('/cart/')
                .then(function(response) {
                    return response.data;
                });
        };

        var addToCart = function(cartData) {
            return $http.post('/cart/', cartData)
                .then(function(response) {
                    return response.data;
                });
        };

        var deleteItem = function(id) {
            return $http.delete('/cart/' + id)
                .then(function(response) {
                    return response.data;
                })
        };

        return {
            getCart: getCart,
            addToCart: addToCart,
            deleteItem: deleteItem
        }
    }
}());
