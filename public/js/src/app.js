'use strict';
var retina = angular.module('retina', ['ui.router', 'ngCookies']);
retina.run(['$rootScope', '$state', '$cookies',function($rootScope, $state, $cookies) {
    $rootScope.$on('$stateChangeStart', function(e, to) {
        // route is not protected
        if (to.data && !angular.isFunction(to.data.rule)) {
            return;
        }
        // Prevents a user from going to the state if it requires authentication
        // the only state that uses this is profile state.
        var authenticated = to.data.rule($cookies);
        if (!authenticated) {
            e.preventDefault();
            $state.go('login');
        }
    });
}]);
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
		})
    .state('main.profile', {
        url: '/profile',
        templateUrl: '../../views/profile.html',
        controller: 'ProfileController',
        controllerAs: 'profile',
        data: {
            rule: requiresLogin
        },
        resolve: {
            user: function(AuthenticationService) {
                return AuthenticationService.getCurrentUser().then(
                    function(response) {
                        return response.data;
                    });
            }
        }

    });
});

function requiresLogin($cookies) {
    return $cookies.get('retinaID');
}
