var retina = angular.module('retina');

retina.controller('FeedController', FeedController);

FeedController.$inject = ['$scope', 'ArticleService'];
function FeedController($scope, ArticleService) {
	var NUM_ARTICLES = 10;
	var articleService = ArticleService;

	$scope.articles = [];

	articleService.request(function(articles) {
		for (var i = 0; i < NUM_ARTICLES; i++) {
			$scope.articles.push(articles.pop());
		}
	});

	$scope.getArticles = function(amount) {
		console.log(amount);]
		return $scope.articles.splice(0, amount);
	}

}