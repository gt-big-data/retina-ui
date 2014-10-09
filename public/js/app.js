var app = angular.module("myapp",['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'partials/index.html'
		})
		.state('feed', {
			url: '/feed',
			abstract: true,
			templateUrl: 'partials/feed.html'
		})
		.state('feed.default', {
			parent: 'feed',
			url: '',
			templateUrl: 'partials/feed-part-default.html'
		})
		.state('feed.mini', {
			parent: 'feed',
			url: '/mini',
			templateUrl: 'partials/feed-part-mini.html'
		})
		.state('about', {
			url: '/about',
			templateUrl: 'partials/about.html'
		})
		.state('contact', {
			url: '/contact',
			templateUrl: 'partials/contact.html'
		})
		.state('login', {
			url: '/login',
			templateUrl: 'partials/login.html'
		})
		.state('start', {
			url: '/start',
			templateUrl: 'partials/start.html'
		})
		.state('query', {
			url: '/query',
			templateUrl: 'partials/query.html'
		})
		.state('settings', {
			url: '/settings',
			templateUrl: 'partials/settings.html'
		})
}).run(function($rootScope, $state) {
	$rootScope.$state = $state;
});

app.controller("activeCtrl", function($scope, $location) {
	$scope.isActive = function(route) {
		return route === $location.path();
	}
})

app.controller("stub",["$scope","$http",function($scope,$http){
	$http.get('/api/stub/').success(function(data){
		$scope.news = data;
	});
}]);

