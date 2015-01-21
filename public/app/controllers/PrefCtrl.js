angular.module('myapp')
    .controller('PrefCtrl', ['$scope', '$http', 'ArticleFactory', PrefCtrl]);

function PrefCtrl($scope, $http, ArticleFactory) {
    var categories = [];
    var keywords = [];
    var sources = [];

    $scope.addCategory = addCategory;
    $scope.addKeyword = addKeyword;
    $scope.addSource = addSource;
    $scope.submit = submit;

    activate();

    /////////////////
    
    function activate() {
        ArticleFactory.getSources().success(function(sources, status) {
            $scope.sources = sources;
        });

        ArticleFactory.getCategoriesOfMostRecentArticles().success(
            function(categories, status) {
                $scope.categories = categories;
            });

        ArticleFactory.getKeywordsOfMostRecentArticles().success(
            function(keywords, status) {
                $scope.keywords = keywords;
            });
    }

    function addCategory(category) {
        if (categories.indexOf(category) < 0) {
            categories.push(category);
        }
    }

    function addKeyword(keyword) {
        if (keywords.indexOf(keyword) < 0) {
            keywords.push(keyword);
        }
    }


    function addSource(source) {
        if (sources.indexOf(keyword) < 0) {
            sources.push(keyword);
        }
    }


    function submit() {
        return $http({
            url: 'users/preferences/update',
            method: 'POST',
            params: {
                categories: JSON.stringify(categories),
                keywords: JSON.stringify(keywords),
            }
        }).success(function(data, status) {});
    }
}