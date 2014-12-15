angular.module('myapp')
    .controller('viewCategoryCtrl', ['$scope', 'ArticleFactory', viewCategoryCtrl]);

function viewCategoryCtrl($scope, ArticleFactory) {
    ArticleFactory.getLatestArticles().success(function(articles, status) {
        $scope.news = articles;
    });

    $scope.loadCategory = function(categoryName) {
        if (categoryName !== "all") {
            ArticleFactory.getArticlesByCategory(categoryName)
            .success(function(articles, status) {
                $scope.news = articles;
            });
        }
        else {
            ArticleFactory.getLatestArticles().success(function(articles, status){
                $scope.news = articles;
            })
        }
    }
}