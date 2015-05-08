var app = angular.module('myapp');
app.directive('feedDirective', FeedDirective);
app.directive('headArticleDirective', HeadArticleDirective);
app.directive('twoColumnDirective', TwoColumnDirective);
app.directive('tripleColumnDirective', TripleColumnDirective);


function FeedDirective() {

    var directive = {
        scope: {
            articles: '='
        },
        restrict: 'AEC',
        templateUrl: '../../partials/feed_directive.html',
        controller: controller,
        link: link,
        // transclude: true,
        bindToController: true
    };


    function link($scope, elems, attrs) {
        $scope.headArticle = $scope.article[0];
    }

    function controller($scope) {
        alert($scope.headArticle);
    }

    return directive;
}


function HeadArticleDirective() {

    var directive = {
        scope: {
           article: '='
        },
        restrict: 'AEC',
        templateUrl: '../partials/full-width-article.html',
        bindToController: true,
        controller: function($scope) {
           $scope.print = function() {
                alert($scope.article.title);
           };
        }
    };

    return directive;
}

function TwoColumnDirective() {
    var directive = {
        scope: {},
        restrict: 'AEC',
        templateUrl: '../partials/two-column-directive.html'
    };

    return directive;
}

function TripleColumnDirective() {

    var directive = {
        scope: {},
        restrict: 'AEC',
        templateUrl: '../partials/triple-column-directive.html'
    };

    return directive;
}