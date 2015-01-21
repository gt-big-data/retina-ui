angular.module('myapp')
    .factory('UserService', UserService);

UserService.$inject = ['$http'];

function UserService($http) {
    var exports = {};

    exports.getUserArticles = function() {
        return $http({
            url: 'users/articles/',
            method: 'GET',
            params: null, 
        });
    };
    
    exports.removeFromPreferences = function(title, type) {
        return $http({
            url: '/users/preferences/delete',
            method: 'DELETE',
            params: {
                title: title,
                type: type,
            }
        });
    };

    exports.addToPreferences = function(title, type) {
        return $http({
            url: '/users/preferences/update',
            method: 'POST',
            params: {
                title: title,
                type: type,
            }
        });
    };

    return exports;
}