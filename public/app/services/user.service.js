(function(){
    "use strict";

    angular
        .module("Main")
        .factory("userService", userService);

    function userService ($http, toastr, Identity, userResource, $location) {

        var LogIn = function(email, password){
            $http.post('/login', { email: email, password: password })
                .then(function(response) {
                    if (response.data.success) {
                        var user = new userResource();
                        angular.extend(user, response.data.user);
                        Identity.currentUser = user;
                        toastr.success(response.data.user.email, 'Logged in');
                        $location.path('/');
                    } else {
                        toastr.error('failed to log in', 'Email or password is incorrect');
                    }
                })
        };

        var logOut = function() {
            $http.post('/logout', { logout: true}).then(function(){
                Identity.currentUser = undefined;
            })
        };

        var signUp = function(email, password) {
            $http.post('/signup', { email: email, password: password})
                .then(function(response){
                    if (response.data.success) {
                        Identity.currentUser = response.data.user;
                        toastr.success(response.data.user.email + ' was successfully created');
                    } else {
                        toastr.error('Failed to signup', 'Try again');
                    }

                })
        };

        return {
            LogIn: LogIn,
            logOut: logOut,
            signUp: signUp
        }
    }
    })();
