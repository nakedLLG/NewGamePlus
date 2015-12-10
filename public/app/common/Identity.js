angular
    .module("Main")
    .factory("Identity", function(userResource, $window) {
        var currentUser;
        if (!!$window.bootstrappedUserObject) {
            currentUser = new userResource();
            angular.extend(currentUser, $window.bootstrappedUserObject);
        }
        return {
            currentUser: currentUser,
            isAuthenticated: function() {
                return !!this.currentUser;
            }
        }
    });