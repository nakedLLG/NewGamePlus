(function(){
    "use strict";

    angular
        .module("Main")
        .factory("productsService", productsService);

    function productsService ($http) {

        var getProducts = function() {
            return $http.get("/games/")
                .then(function(response){
                    return response.data;
                })
        };

        var getBrands = function(){
            return $http.get("/categories/")
                .then(function(response){
                return response.data
            })
        };


        var getProduct = function(id){
            return $http.get("/games/" + id)
                .then(function(response){
                    return  response.data;
                });
        };

        var createProduct = function(gameData) {
            return $http.post('/games/', gameData);
        };

        var createBrand = function(categoryData) {
            return $http.post('/categories/', categoryData);
        };

        var updateProduct = function(game, id) {
            return $http.put('/games/' + id, game)
                .then(function(response){
                    return response.data;
                });
        };

        var deleteProduct = function(id) {
            return $http.delete('/games/' + id)
                .then(function(response){
                    return response.data
                });
        };

        return {
            getProducts: getProducts,
            getBrands: getBrands,
            getProduct: getProduct,
            createProduct: createProduct,
            updateProduct: updateProduct,
            deleteProduct: deleteProduct,
            createBrand: createBrand
        }
    }
}());