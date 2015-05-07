var retina = angular.module('retina', ['ui.router']);

retina.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

	$urlRouterProvider.otherwise('home');

	$stateProvider.state('home', {
		url: '/home',
		templateUrl: '../../views/home.html'
	});

	$stateProvider.state('login', {
		url: '/login',
		templateUrl: '../../views/login.html'
	})

	$stateProvider.state('register', {
		url: '/register',
		templateUrl: '../../views/register.html'
	})

	// $locationProvider.html5Mode(true);
});