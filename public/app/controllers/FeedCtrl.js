angular.module('myapp')
    .controller('FeedCtrl', FeedCtrl);

FeedCtrl.$inject = ['$scope', '$http', 'ArticleFactory', 'ArticleModalService'];

function FeedCtrl($scope, $http, ArticleFactory, ArticleModalService) {
    $scope.page = 1;
    $scope.recordView = recordView;
    $scope.hoursAgo = hoursAgo;
    $scope.stripHTML = stripHTML;
    $scope.nextPage = nextPage;
    $scope.showArticle = showArticle;
    $scope.getSource = getSource;
    $scope.getImageUrl = getImageUrl;


    activate();

    /////////////////////

    function activate() {
        ArticleFactory.getLatestArticles($scope.page).success(function(data, status) {
            $scope.articles = data;
        });
    }


    function recordView(articleID) {
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
        if (elapsed == 0) {
            return 'just now';
        }
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

    function showArticle(articleId) {
        $scope.recordView(articleId);
        ArticleFactory.getArticleById(articleId).success(function(article, status) {
            var modalOptions = article;
            ArticleModalService.showModal({}, modalOptions).then(function (result) {
                
            });
        });
    }

    function getSource(source) {
        if (source) {
            return source.split('.')[1].toUpperCase();
        }
        return "";
    }

    function getImageUrl(source) {
        return '../images/news-icons/' + source + '.png';
    }
}