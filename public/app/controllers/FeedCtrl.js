angular.module('myapp')
    .controller('FeedCtrl', ['$scope', '$http', 'ArticleFactory', FeedCtrl]);

function FeedCtrl($scope, $http, ArticleFactory) {
    $scope.page = 1;
    $scope.record = record;
    $scope.hoursAgo = hoursAgo;
    $scope.stripHTML = stripHTML;
    $scope.nextPage = nextPage;

    activate();

    /////////////////////

    function activate() {
        ArticleFactory.getLatestArticles($scope.page).success(function(data, status) {
            $scope.articles = data;
        });
    }


    function record(articleID) {
        return $http({
            url: '/users/preferences/record',
            method: 'POST',
            params: {
                article: articleID,
            }
        });
    }


    function hoursAgo(pubdate) {
        var now = new Date();
        var published = new Date(pubdate);
        var elapsed = now.getHours() - published.getHours();
        return elapsed + 'h ago';
    }


    function stripHTML(articleSummary) {
        return articleSummary.replace(/<(?:.|\n)*?>/gm, '');
    }


    function nextPage() {
        ArticleFactory.getLatestArticles($scope.page).success(function(data, status) {
            $scope.articles = data;
            $scope.page++;
        });
    }
}