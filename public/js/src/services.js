'use strict';
var retina = angular.module('retina');

retina.factory('ArticleService', ArticleService);
retina.service('NavigationService', NavigationService);


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
    }

    return service;
}

NavigationService.$inject = ['$state'];
function NavigationService($state) {
    var service = {};

    service.toArticle = function(id) {
        $state.go('main.article', {id: id});
    };

    return service;
}