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
        templateUrl: '../../views/main.html',
        controller: function($scope, $stateParams) {
            $scope.$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState, fromParams) {
                    $scope.label = toParams.keyword;
            });
        }
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
            },
            trending: function(ArticleService) {
                return ArticleService.getTending().then(function(response) {
                    return response.data.data;
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
                related: function($stateParams, ArticleService) {
                    return ArticleService.getByKeyword($stateParams.keyword)
                        .then(function(response) {
                            return response.data;
                        });
                }
            }
		});
});

function requiresLogin($cookies) {
    return $cookies.get('retinaID');
}
