angular.module('myapp')
    .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$scope', '$http', 'ArticleFactory', 'UserService'];

function ProfileCtrl($scope, $http, ArticleFactory, UserService) {
    
    // Bindable Members
    // $scope.showMoreCategories = showMoreCategories;
    // $scope.showMoreKeywords = showMoreKeywords;
    $scope.modifyCategory = modifyCategory;
    $scope.modifyKeyword = modifyKeyword;
    $scope.modifyArticle = modifyArticle;
    $scope.moreCategories = moreCategories;
    $scope.moreKeywords = moreKeywords;
   
    activate();

    ////////////////////////

    function activate() {
        return $http({
            url:'/users/profile',
            method:'GET',
            params: null
        }).success(function(profile, status) {
            $scope.vm = profile;
        });
    }

    function modifyCategory(category) {
        if ($scope.vm.categories.indexOf(category) < 0) {
            console.log('adding category');
            addItem(category, 'categories');
            $scope.vm.categories.push(category);
        } 
        else {
            console.log('removing category');
            removeItem(category, 'categories');
        }
    }

    function modifyKeyword(keyword) {
        if ($scope.vm.keywords.indexOf(keyword) < 0) {
            addItem(keyword, 'keywords');
            $scope.vm.keywords.push(keyword);
        } 
        else {
            removeCategory(keyword, 'keywords');
        }
    }

    function modifyArticle(articleID) {
        if ($scope.vm.articles.indexOf(articleID) < 0) {
            addCategory(articleID, 'articles');
        } 
        else {
            removeCategory(articleID, 'articles');
        }
    }
    
    function addItem(title, type) {
        UserService.addToPreferences(title, type).success(
            function(data, status) {

            });
    }

    function removeItem(title, type) {
        UserService.removeFromPreferences(title, type).success(
            function(data, status) {

            });
    }

    function moreCategories() {
        ArticleFactory.getCategoriesOfMostRecentArticles().success(
            function(categories, status) {
                $scope.categories = categories;
                $scope.showMoreCategories = $scope.showMoreCategories;
            });
    }

    function moreKeywords() {
        ArticleFactory.getKeywordsOfMostRecentArticles().success(
            function(keywords, status) {
                $scope.keywords = keywords;
                $scope.showMoreKeywords = !$scope.showMoreKeywords;
            });
    }

    // function showMoreCategories() {
    //     $scope.showMoreCategories = !scope.showMoreCategories;
    // }

    // function showMoreKeywords() {
    //     $scope.showMoreKeywords = !scope.showMoreCategories;
    // }
}

