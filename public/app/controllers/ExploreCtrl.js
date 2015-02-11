"use strict"

angular.module('myapp')
    .controller('ExploreCtrl', ExploreCtrl);

ExploreCtrl.$inject = ['$scope','$http', 'ArticleFactory', 'UserService'];

function ExploreCtrl($scope, $http, ArticleFactory, UserService) {
    var categoryPage = 1;
    var keywordPage = 1;
    $scope.keywords = [];
    $scope.categories = [];
    $scope.addCategory = addCategory;
    $scope.addKeyword = addKeyword;
    $scope.moreKeywords = moreKeywords;
    $scope.moreCategories = moreCategories;

    activate();
    ///////////
    function activate() {
        ArticleFactory.recentCategories(categoryPage).success(function(categories, status) {
            $scope.categories = categories;
        });

        ArticleFactory.recentKeywords(keywordPage).success(function(keywords, status) {
            $scope.keywords = keywords;
        });

    }

    function addCategory(category) {
        UserService.updateCategories(category).success(function(res, status) {

        });
    }

    function addKeyword(keyword) {
        UserService.updateKeywords(keyword).success(function(res, status) {

        });
    }

    function moreCategories() {
        categoryPage++;
        ArticleFactory.recentCategories(categoryPage).success(function(categories, status) {
            $scope.categories.push(categories);
        });
    }

    function moreKeywords() {
        keywordPage++;
         ArticleFactory.recentKeywords(keywordPage).success(function(keywords, status) {
            $scope.keywords.push(keywords);
        });
    }
}