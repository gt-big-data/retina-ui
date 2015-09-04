'use strict';

/**
    Hi and welcome to services.js. Services provided a way to organize and share
    code across your app. For the purpose of this tutorial we only need a
    service to get the latest articles and return data for a specific article.
 */
var retina = angular.module('retina');

/**
    Here we register our service with our module so it can be used in other
    parts of our application.
*/
retina.factory('ArticleService', ArticleService);

/**
    Here we are injecting the $http service. $http is a core service that makes
    it easy to communicate with our server to retrieve information from our
    database.

    For the purpose of this exercise you only need one method, get.

    $http.get(url, params)
    url: the url endpoint on the server that you want to communicate with
    params: any parameters that you would like to pass along (you wont need
        this below)

    Here's a link to the documentation for $http service:
        https://docs.angularjs.org/api/ng/service/$http
*/
ArticleService.$inject = ['$http'];
function ArticleService($http) {
    var service = {};

    service.getLatestArticles = function(page) {
        /**
            On our server we have an endpoint for getting the latest articles
            in multiples of 20. It is: /articles/latest/:page where :page is the
            page that you would like.
        */

        return; // How would you use $http to do this?
    };

    service.getArticle = function(articleId) {
         /**
            On our server we have an endpoint for getting the specific content
            of an article by searching for it by its id. The end point is
            /articles/:id. The approach is really similar to the method above.
        */
        return; // How would you use $http to do this?
    };

    return service;
}