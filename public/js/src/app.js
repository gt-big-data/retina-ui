'use strict';
var retina = angular.module('retina', ['ui.router']);
retina.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('home');
	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: '../../views/home.html'
	})
	.state('login', {
		url: '/login',
		templateUrl: '../../views/login.html'
	})
	.state('register', {
		url: '/register',
		templateUrl: '../../views/register.html'
	})
    .state('main', {
        url: '/main',
        templateUrl: '../../views/main.html'
    })
    .state('main.feed', {
        url:'/feed',
        templateUrl: '../../views/feed.html',
        controller: 'FeedController',
        controllerAs: 'feed',
        resolve: {
            articles: function(ArticleService) {
                return ArticleService.latest(1).then(function(response) {
                    return response.data;
                });
            }
        }
    })
    .state('main.article', {
        url:'/article/:id',
        templateUrl: '../../views/article.html',
        controller: 'ArticleController',
        controllerAs: 'article',
        resolve: {
            article: function($stateParams, ArticleService) {
                return ArticleService.getArticle($stateParams.id).then(
                    function(response) {
                        return response.data;
                    });
            }
        }
    });
});