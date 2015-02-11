angular.module('myapp')
    .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$scope', '$http', 'ArticleFactory', 'UserService'];

function ProfileCtrl($scope, $http, ArticleFactory, UserService) {
    
    // Bindable Members
    $scope.showMoreCategories = true;
    $scope.showMoreKeywords = true;
    $scope.removeCategory = removeCategory;
    $scope.removeKeyword = removeKeyword;
   
    activate();

    ////////////////////////

    function activate() {
       UserService.getProfileInfo().success(function(profile, status) {
            $scope.vm = profile;
        });
    }

    function removeCategory(category, index) {
        UserService.removeCategory(category).success(function(res, status) {
            $scope.vm.categories.splice(index, 1);
        });
    }

    function removeKeyword(keyword, index) {
        UserService.removeKeyword(keyword).success(function(res, status) {
            $scope.vm.keywords.splice(index, 1);
        });
    }

}

