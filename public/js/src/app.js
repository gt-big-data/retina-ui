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
	.state('feed', {
		url: '/feed',
		templateUrl: '../../views/feed.html',
		controller: 'FeedController',
		controllerAs: 'feed',
		resolve: {
			articles: function(ArticleService) {
				return ArticleService.latest(1);
			}
		}
	})
	.state('main.newsfeed', {
		url:'/newsfeed',
		templateUrl: '../../views/newsfeed.html',
	})
    .state('main.newsfeed.feed', {
        url:'/feed',
        templateUrl: '../../views/feed.html',
        controller: 'FeedController',
        controllerAs: 'feed',
        resolve: {
            articles: function(ArticleService) {
                return ArticleService.latest(1);
            }
        }
    })
    .state('main.newsfeed.categories', {
        url:'/categories',
        templateUrl: '../../views/categories.html'
    })
    .state('main.newsfeed.topics', {
        url:'/topics',
        templateUrl: '../../views/topics.html'
    });
});
