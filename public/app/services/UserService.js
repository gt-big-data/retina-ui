angular.module('myapp')
    .factory('UserService', UserService);

UserService.$inject = ['$http'];

function UserService($http) {
    var exports = {};

    exports.getProfileInfo = function() {
         return $http({
            url:'/users/profile',
            method:'GET',
            params: null
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

    exports.removeKeyword = function(keyword) {
        return $http({
            url: '/users/preferences/delete/keyword',
            method: 'POST',
            params: {
                keyword: keyword
            }
        });
    };

    exports.removeCategory = function(category) {
        return $http({
            url: '/users/preferences/delete/category',
            method: 'POST',
            params: {
                category: category,
            }
        });
    };

    return exports;
}