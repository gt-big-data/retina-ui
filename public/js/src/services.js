'use strict';
var retina = angular.module('retina');

retina.factory('ArticleService', ArticleService);
retina.factory('AuthenticationService', AuthenticationService);

ArticleService.$inject = ['$http'];
function ArticleService($http) {
    var service = {};
    var base = 'http://api.retinanews.net/';

    service.latest = function latest(page) {
        return $http.get(base + 'article/recent/' + page);
    };

    service.getArticle = function(articleId) {
        return $http.get(base + 'article/id/'+ articleId);
    };

    return service;
}