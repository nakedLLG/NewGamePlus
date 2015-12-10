(function(){
    "use strict";

    angular
        .module('Main', [ 'ngRoute', 'ngResource', 'main.products', 'main.product', 'main.management', 'main.cart', 'main.account', 'toastr' ])
        .config(function($routeProvider, $locationProvider){

            $routeProvider
                .when('/games/:id', {
                    templateUrl: '/partials/product.ejs',
                    controller: 'productController'
                })
                .when('/cart/', {
                    templateUrl: '/partials/cart.ejs',
                    controller: 'cartController'
                })
                .when('/', {
                    templateUrl: '/partials/products.ejs',
                    controller: 'productsController'
                })
                .when('/checkout/', {
                    templateUrl: '/partials/checkout.ejs',
                    controller: 'checkoutController'
                })
                .when('/account/', {
                    templateUrl: '/partials/account.ejs',
                    controller: 'accountController'
                })
                .when('/management/', {
                    templateUrl: '/partials/management.ejs',
                    controller: 'managementController'
                })
                .when('/management/addProduct', {
                    templateUrl: '/partials/addProduct.ejs',
                    controller: 'managementController'
                })
                .when('/management/edit/:id', {
                    templateUrl: '/partials/edit.ejs',
                    controller: 'managementController'
                })
                .when('/management/delete/:id', {
                    templateUrl: '/partials/delete.ejs',
                    controller: 'managementController'
                })
                .otherwise({ redirectTo: '/' });
        })
        .controller("indexController", indexController);

    function indexController($scope, cartService, $window, Identity, userService, toastr, $location) {
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
            $window.location.reload();
        };

        $scope.identity = Identity;

        $scope.logout = function() {
            userService.logOut();
            $scope.email = "";
            $scope.password = "";
            toastr.success('You have successfully logged out');
            $location.path('/');
        };
    }
}());
