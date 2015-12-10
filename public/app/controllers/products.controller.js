(function(){
    "use strict";

    angular
        .module("main.products", [])
        .controller("productsController", productsController);

    function productsController($scope, productsService){

        var modelProducts = function(data){
            $scope.products = data;
        };

        productsService.getProducts()
            .then(modelProducts);

        var modelBrands = function(data) {
            $scope.categories = data;
        };

        productsService.getBrands()
            .then(modelBrands);

        $scope.query = {};

        $scope.select = function(item) {
            $scope.selected = item;
        };

        $scope.isActive = function(item) {
            return $scope.selected === item;
        };
    }
}());
