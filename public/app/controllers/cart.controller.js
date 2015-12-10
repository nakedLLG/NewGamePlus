(function(){
    "use strict";

    angular
        .module('main.cart', [])
        .controller('cartController', cartController);

    function cartController($scope, cartService, $route, $window) {
        $scope.cartList = {};

        var modelCart = function(data) {
            $scope.cartList = data;
        };

        cartService.getCart().then(modelCart);

        $scope.getTotal = function() {
            var total = 0;
            for (var i = 0; i < $scope.cartList.length; i++) {
                var cart = $scope.cartList[i];
                total += cart.price;
            }
            return total.toLocaleString();
        };

        $scope.removeItem = function(id) {
            cartService.deleteItem(id);
            $route.reload();
            $window.location.reload();
        };
    }
}());
