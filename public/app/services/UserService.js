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

    exports.updateCategories = function(title, type) {
        return $http({
            url: '/users/preferences/update/categories',
            method: 'POST',
            params: {
                title: title,
                type: type,
            }
        });
    };

    exports.updateKeywords = function(title, type) {
        return $http({
            url: '/users/preferences/update/keywords',
            method: 'POST',
            params: {
                title: title,
                type: type,
            }
        });
    };

    return exports;
}