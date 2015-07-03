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
		controller: 'FeedController as feed',
		resolve: {
			ArticleServiceData : function(ArticleService) {
				return ArticleService.promise;
			}
		}
	})
	.state('main.article', {
		url: '/article/:id',
		templateUrl: '../../views/article.html',
		controller: 'ArticleController',
		resolve: {
			article: ['$stateParams', 'ArticleService',
			function($stateParams, ArticleService) {
				return ArticleService.getArticle($stateParams.id);
			}]
		}
	});
});