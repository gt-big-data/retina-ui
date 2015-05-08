var retina = angular.module('retina');

retina.directive('simpleList', ['ArticleService', SimpleList]);
retina.directive('articlePanel', Panel);
retina.directive('card', ['ArticleService', Card]);
function SimpleList(ArticleService) {

    var directive = {
        scope: {},
        restrict: 'AE',
        replace: true,
        templateUrl: 'templates/simple-list.html',
    };

    directive.controller = function($scope, ArticleService) {
        var NUM_ARTICLES = 5
        var as = ArticleService;
        $scope.articles = [];
        as.request(function(articles) {
            console.log(articles.length);
            for (var i = 0; i < 5; i++) {
                $scope.articles.push(articles.pop());
            }
        });
    };

    directive.link = function($scope, $elem, $attrs) {

    };

    return directive;
}

function Panel() {

    var directive = {
        scope: {
            article: '='
        },
        restrict: 'AE',
        replace: true,
        templateUrl: 'templates/panel.html',
    };

    directive.controller = function($scope) {
       
    };

    directive.link = function($scope, $elem, $attrs) {

    };

    return directive;
}

function Card() {
     var directive = {
        scope: {},
        restrict: 'AE',
        replace: true,
        templateUrl: 'templates/card.html',
    };

    directive.controller = function($scope, ArticleService) {
        $scope.article;
        var as = ArticleService;
        as.request(function(articles) {
            console.log(articles.length);
            $scope.article = articles.pop();
       });
    };

    directive.link = function($scope, $elem, $attrs) {

    };

    return directive;
}