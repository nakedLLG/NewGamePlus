(function(){
    "use strict";

    angular
        .module("main.product", [])
        .controller("productController", productController);

    function productController($scope, productsService, $routeParams, cartService, $window){

        var modelProduct = function(data) {
            $scope.product = data;
            $scope.mainImageUrl = data.image;
        };

        productsService.getProduct($routeParams.id)
            .then(modelProduct);

        $scope.setImage = function(imageUrl) {
            $scope.mainImageUrl = imageUrl;
        };

        $scope.addToCart = function() {
            var cart = { 'image': $scope.product.image, 'product': $scope.product.name, 'brand': $scope.product.brand,
                'price': $scope.product.price };//$scope.product.headBrand + " " +

            cartService.addToCart(cart);
            $window.location.reload();
        }
    }

}());
