angular.module('myapp')
    .controller('PrefCtrl', ['$scope', 'ArticleFactory', PrefCtrl]);

function PrefCtrl($scope, ArticleFactory) {
    var preferences = {
        categories: [],
        keywords:[],
        sources:[],
    }

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
        if (preferences.categories.indexOf(category) < 0) {
            preferences.categories.push(category);
        }
    }

    $scope.addKeyword = function(keyword) {
        if (preferences.keywords.indexOf(keyword) < 0) {
            preferences.categories.push(keyword);
        }
    }

    $scope.addSource = function(source) {
        if (preferences.sources.indexOf(source) < 0) {
            preferences.sources.push(source);
        }
    }

}