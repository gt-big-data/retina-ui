'use strict';
var retina = angular.module('retina');

retina.factory('ArticleService', ArticleService);
retina.factory('AuthenticationService', AuthenticationService);

ArticleService.$inject = ['$http'];
function ArticleService($http) {
    var service = {};

    service.latest = function latest(page) {
        return $http.get('/api/articles/latest/' + page);
    };

    service.getByCategory = function(category) {
        return $http.get('/api/articles/category/' + category);
    };

    service.getArticle = function(articleId) {
        return $http.get('/api/articles/' + articleId)
    };

    return service;
}

AuthenticationService.$inject = ['$http'];
function AuthenticationService($http) {
    var service = {};

    service.getCurrentUser = function() {
        return $http.get('/users/user');
    };

    return service;

}