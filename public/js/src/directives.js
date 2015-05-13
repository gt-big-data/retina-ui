var retina = angular.module('retina');

retina.directive('simpleList', ['ArticleService', SimpleList]);
retina.directive('mediaList', ['ArticleService', MediaList]);
retina.directive('card', ['$state','ArticleService', Card]);
retina.directive('extendedCard', ['$state', 'ArticleService', ExtendedCard]);

function SimpleList(ArticleService) {

    var directive = {
        scope: {
            articles: '=',
            title: '=',
            navigate: '&'
        },
        restrict: 'AE',
        replace: true,
        templateUrl: 'templates/simple-list.html',
    };

    directive.controller = function($scope, ArticleService) {
    };

    directive.link = function($scope, $elem, $attrs) {

    };

    return directive;
}


function MediaList(ArticleService) {

    var directive = {
        scope: {
            articles: '=',
            title: '='
        },
        restrict: 'AE',
        replace: true,
        templateUrl: 'templates/media-list.html',
    };

    directive.controller = function($scope, ArticleService) {
       
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

    directive.controller = function($scope, ArticleService, NavigationService) {
        var articleService = ArticleService;
        $scope.article = [];
        articleService.request(function(articles) {
            $scope.article = articles.pop();
        });

        $scope.navigate = function(id) {
           NavigationService.toArticle(id);
        };
       
    };

    directive.link = function($scope, $elem, $attrs) {

    };

    return directive;
}

function ExtendedCard() {
    var directive = {
        scope: {},
        restrict: 'AE',
        replace: true,
        templateUrl: 'templates/extended-card.html',
    };

    directive.controller = function($scope, $state, ArticleService) {
        var articleService = ArticleService;
        $scope.article = [];
        articleService.request(function(articles) {
            $scope.article = articles.pop();
        });
       
    };

    directive.link = function($scope, $elem, $attrs) {

    };

    return directive;
}