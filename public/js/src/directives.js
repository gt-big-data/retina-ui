var retina = angular.module('retina');

retina.directive('articleGrid', [ArticleGrid]);
retina.directive('articleCard', [ArticleCard]);

function ArticleGrid() {

    var directive = {
        scope: {
            articles: '='
        },
        restrict: 'AE',
        replace: true,
        templateUrl: 'templates/article-grid.html',
    };

    directive.controller = function($scope) {

    };

    directive.link = function($scope, $element, $attrs) {

    };

    return directive;
}

function ArticleCard() {

    var directive = {
        scope: {
            article:'='
        },
        restrict: 'AE',
        replace: true,
        templateUrl: 'templates/article-card.html',
    };

    directive.controller = function($scope) {};

    directive.link = function($scope, $element, $attrs) {
        var article = $scope.article;
        $element.addClass(article.category.toLowerCase() + '-color');        
    };

    return directive;
}



