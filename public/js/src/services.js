'use strict';
var retina = angular.module('retina');

retina.factory('ArticleService', ArticleService);
retina.factory('AuthenticationService', AuthenticationService);

ArticleService.$inject = ['$http'];
function ArticleService($http) {
    var service = {};

    service.latest = function latest(page) {
        return $http.get('/articles/latest/' + page);
    };

    service.getArticle = function(articleId) {
        return $http.get('/articles/' + articleId)
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