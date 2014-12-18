angular.module('myapp')
    .controller('PrefCtrl', ['$scope','$http', 'ArticleFactory', PrefCtrl]);

function PrefCtrl($scope, $http, ArticleFactory) {
    var date = {
        categories: [],
        keywords:[],
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
        if (date.categories.indexOf(category) < 0) {
            console.log(category);
            date.categories.push(category);
        }
    }

    $scope.addKeyword = function(keyword) {
        if (date.keywords.indexOf(keyword) < 0) {
            date.keywords.push(keyword);
        }
    }

    $scope.submit = function() {
        console.log('clicked');
        return $http({
            url: 'users/preferences/update',
            method: 'POST',
            params: {
                preferences: JSON.stringify(date),
            }
        }).success(function(data, status) {
            console.log(data);
        });
    }
}