var retina = angular.module('retina');

retina.service('AuthService', AuthService);
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

ArticleService.$inject = ['$http'];
function ArticleService($http) {
    var service = {};
    var articles = [];
    var page = 1;

    function latest() {
        return  $http.get('/api/articles/latest/' + page)
        .success(function(data, status) {
            articles = data;
        })
    }
    
    service.promise = latest();

    service.request = function(callback) {
        service.promise.then(callback(articles));
        console.log(articles.length);
    }

    return service;
}