'use strict';
var retina = angular.module('retina');

retina.factory('ArticleService', ArticleService);

ArticleService.$inject = ['$http'];
function ArticleService($http) {
    var service = {};
    var base = 'http://api.retinanews.net';
    service.latest = function latest(page) {
        return $http.get(base + '/article/recent/' + page, {cache: true});
    };

    service.getArticle = function(articleId) {
        return $http.get(base + '/article/id/'+ articleId);
    };

    service.getTrending = function() {
        return $http.get(base + '/trending', {cache: true});
    };

    service.getByKeyword = function(keyword) {
        return $http.get(base + '/article/keywords/' + keyword)
    };

    service.getCoKeywords = function(keyword) {
        return $http.get(base + '/cokeywords/' + keyword);
    };

    return service;
}