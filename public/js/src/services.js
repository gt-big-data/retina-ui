var retina = angular.module('retina');

retina.factory('AuthService', AuthService);
retina.factory('ArticleService', ArticleService);

AuthService.$inject = ['$http'];
function AuthService($http) {
    var service = {};

    service.isValidEmail = function(email) {
        return false;
    };

    service.isValidPassword = function(password) {
        return false;
    };

    service.attemptFacebookLogin = function() {

    };

    service.attemptGPlusLogin = function() {

    };

    service.attemptLocalLogin = function(username, password) {

    };

    service.attemptLocalRegistration = function(username, password) {

    };

    return service;
}

ArticleService.$inject = ['$http', '$q'];
function ArticleService($http, $q) {
    var service = {};
    var articles = [];
    var page = 1;

    function latest(page) {
        return $http({
            url: '/api/articles/latest/' + page,
            method: 'GET',
        }).success(function(data, status) {
            data.forEach(function(newArticle) {
                articles.push(newArticle);
            });
        }).error(function(data, status) {

        });
    }

    service.request = function(callback) {
        if (!articles.length) {
            latest(page).then(function() {
                callback(articles);
            });
            page++;
        }
        else {
            callback(articles);
        }
    
    };

    return service;
}