angular.module('myapp')
    .controller('FeedCtrl', FeedCtrl);

FeedCtrl.$inject = ['$scope', '$http', 'ArticleFactory', 'ArticleModalService'];

function FeedCtrl($scope, $http, ArticleFactory, ArticleModalService) {
    $scope.page = 1;
    $scope.record = record;
    $scope.hoursAgo = hoursAgo;
    $scope.stripHTML = stripHTML;
    $scope.nextPage = nextPage;
    $scope.showArticle = showArticle;

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

    function showArticle(articlesId) {
        ArticleFactory.getArticleById(articlesId).success(function(article, status) {
            var modalOptions = article;
            ArticleModalService.showModal({}, modalOptions).then(function (result) {
                dataService.deleteCustomer($scope.customer.id).then(function () {
                    $location.path('/customers');
                }, processError);
            });
        });



    }
}