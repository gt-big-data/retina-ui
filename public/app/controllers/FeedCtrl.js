angular.module('myapp')
    .controller('FeedCtrl', ['$scope', '$http', 'ArticleFactory', FeedCtrl]);

function FeedCtrl($scope, $http, ArticleFactory) {
    ArticleFactory.getLatestArticles().success(function(data, status) {
        $scope.articles = data;
    });
}