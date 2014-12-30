angular.module('myapp')
    .controller('FeedCtrl', ['$scope', '$http', 'ArticleFactory', FeedCtrl]);

function FeedCtrl($scope, $http, ArticleFactory) {
    $scope.page = 1;
    ArticleFactory.getLatestArticles($scope.page).success(function(data, status) {
        $scope.articles = data;
    });

    $scope.saveArticle = function(articleID) {
        return $http({
                    url: '/users/preferences/save',
                    method: 'POST',
                    params: {
                        article: articleID,
                    }
        });
    }

    $scope.hoursAgo = function(pubdate) {
        var now = new Date();
        var published = new Date(pubdate);
        var elapsed = now .getHours() - published.getHours();
        return elapsed + 'h ago';
    }

    
    $scope.stripHTML = function(articleSummary) {
        return articleSummary.replace(/<(?:.|\n)*?>/gm, '');
    }

    $scope.nextPage = function() {
        ArticleFactory.getLatestArticles($scope.page).success(function(data, status){
            $scope.articles = data;
            $scope.page++;
        });
    }
}