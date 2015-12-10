(function(){
    "use strict";

    angular
        .module('main.account', [])
        .controller('accountController', accountController);

    function accountController($scope, userService, Identity) {

        $scope.identity = Identity;
        $scope.login = function(email, password) {
            userService.LogIn(email, password);

        };


        $scope.signup = function(email, password) {
            userService.signUp(email, password);
        }
    }
}());
