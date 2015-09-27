'use strict';
var retina = angular.module('retina', ['ui.router', 'ngCookies']);

retina.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('home');
	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: '../../views/home.html',
	})
	.state('login', {
		url: '/login',
		templateUrl: '../../views/login.html'
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
                return ArticleService.latest(20).then(function(response) {
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
    })

		.state('main.keyword', {
			url: '/keyword/:keyword',
			templateUrl: '../views/keyword.html',
			controller: 'KeywordController',
			controllerAs: 'keyword',
			resolve: {
					keyword: function($stateParams) {
						return $stateParams.keyword;
					}
			}
		});
});

function requiresLogin($cookies) {
    return $cookies.get('retinaID');
}
