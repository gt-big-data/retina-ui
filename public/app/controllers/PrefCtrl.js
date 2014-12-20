angular.module('myapp')
    .controller('PrefCtrl', ['$scope','$http', 'ArticleFactory', PrefCtrl]);

function PrefCtrl($scope, $http, ArticleFactory) {
   var categories = [];
   var keywords = [];

    ArticleFactory.getSources().success(function(sources, status) {
        $scope.sources = sources;
    });

    ArticleFactory.getCategoriesOfMostRecentArticles().success(
        function(categories, status){
            $scope.categories = categories;
    });

    ArticleFactory.getKeywordsOfMostRecentArticles().success(
        function(keywords, status){
            $scope.keywords = keywords;
    });

    $scope.addCategory = function(category) {
        if (categories.indexOf(category) < 0) {
            categories.push(category);
        }
    }

    $scope.addKeyword = function(keyword) {
        if (keywords.indexOf(keyword) < 0) {
            keywords.push(keyword);
        }
    }

    $scope.submit = function() {
        return $http({
            url: 'users/preferences/update',
            method: 'POST',
            params: {
                categories: JSON.stringify(categories),
                keywords: JSON.stringify(keywords),
            }
        }).success(function(data, status) {
        });
    }
}