var retina = angular.module('retina');

retina.controller('FeedController', FeedController);
retina.controller('ArticleController', ArticleController);

FeedController.$inject = ['$scope', 'ArticleService', 'NavigationService'];
function FeedController($scope, ArticleService, NavigationService) {
	var NUM_ARTICLES = 10;
	var articleService = ArticleService;

	$scope.articles = [];

	articleService.request(function(articles) {
		for (var i = 0; i < NUM_ARTICLES; i++) {
			$scope.articles.push(articles.pop());
		}
	});

    $scope.navigate = function(id) {
        // console.log('called');
        console.log(id);
        // NavigationService.toArticle(id);
    };

}

ArticleController.$inject = ['$scope', 'ArticleService', 'article'];
function ArticleController($scope, ArticleService, article) {
    $scope.article = article.data;
}