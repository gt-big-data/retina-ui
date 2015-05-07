var retina = angular.module('retina', ['ui.router']);

retina.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('home');
	$stateProvider.state('home', {
		url: '/home',
		templateUrl: '../../views/home.html'
	})
});