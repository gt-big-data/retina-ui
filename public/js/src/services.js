'use strict';
var retina = angular.module('retina');

retina.service('AuthService', AuthService);
retina.factory('ArticleService', ArticleService);
retina.service('NavigationService', NavigationService);

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

    service.latest = function latest(page) {
        return $http.get('/api/articles/latest/' + page);
    };
    
    service.getByCategory = function(category) {
        return $http.get('/api/articles/category/' + category);
    };

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