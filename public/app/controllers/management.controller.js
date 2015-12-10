(function(){
    "use strict";

    angular
        .module("main.management", [])
        .controller("managementController", managementController);

    function managementController($scope, productsService, $routeParams, $location, $timeout, toastr) {

        var modelProducts = function(data){
            $scope.products = data;
        };

        productsService.getProducts()
            .then(modelProducts);

        var modelProduct = function(data) {
            $scope.product = data;
        };

        productsService.getProduct($routeParams.id)
            .then(modelProduct);

        $scope.addProduct = function(){
            var id = $scope.name.replace(/\s+/g, '-').toLowerCase();
            var car = { 'id': id, 'name': $scope.name, 'price': $scope.price, 'brand': $scope.brand,
                'image': $scope.image, 'description': $scope.description }; //'headBrand': $scope.headBrand

            var category = { 'id': $scope.brands, 'brands': [$scope.brand] }; //, 'headBrand': $scope.headBrand
            productsService.createProduct(car);
            productsService.createBrand(category);
            $location.path("/management/");
            toastr.success('Game is added');
        };

        $scope.updateProduct = function() {
            var id = $scope.product.name.replace(/\s+/g, '-').toLowerCase();
            var car = { 'id': id, 'name': $scope.product.name, 'price': $scope.product.price,
                'brand': $scope.product.brand, 'image': $scope.image, 'description': $scope.product.description };//, 'headBrand': $scope.product.headBrand
            productsService.updateProduct(car, $scope.product.id);
            $location.path("/management/");
            toastr.success('Game is updated');
        };

        $scope.deleteProduct = function(){
            productsService.deleteProduct($scope.product.id);
            $location.path("/management/");
            toastr.success('Car is deleted');
        };


        $scope.uploadPic = function(file) {
            file.upload = Upload.upload({
                url: './public/images/',
                data: { file: file }
            });

            file.upload.then(function(response){
                $timeout(function(){
                    file.result = response.data;
                });
            }, function(response) {
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ": " + response.data;
                }
            }, function(evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    }
}());
