var retina = angular.module('retina', ['ui.router']);

retina.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

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
	.state('feed', {
		url:'/feed',
		templateUrl: '../../views/feed.html'
	});

	// $locationProvider.html5Mode(true);
});