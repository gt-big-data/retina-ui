angular.module('myapp')
    .factory('ArticleFactory', ['$http', ArticleFactory]);

function ArticleFactory($http) {
    var exports = {};
    
    var request = function(endpoint) {
        var base = '/api/articles/';
        return {
            url: base + endpoint,
            method: 'GET',
            params: null,
        };
    };

    exports.getLatestArticles = function(page) {
        return $http(request('latest/' + page));
    };

    exports.getArticlesBySource = function(source) {
        return $http(request('source/' + source));
    };

    exports.getArticlesByCategory = function(category) {
        return $http(request('category/' + category));
    };

    exports.getArticlesByKeyword = function(keyword) {
        return $http(request('keyword/' + keyword));
    };

    exports.getArticlesId = function(id) {
        return $http(request('id/' + id));
    };

    exports.getArticleById = function(id) {
        return $http(request('id/' + id));
    };
    exports.recentKeywords = function(page) {
        return $http(request('categories/' + page));    
    };

    exports.recentCategories = function(page) {
        return $http(request('keywords/' + page));    
    };

    exports.getSources = function() {
        return $http(request('sources'));
    };
    
    return exports;
}