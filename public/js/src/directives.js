var retina = angular.module('retina');

retina.directive('articleGrid', [ArticleGrid]);
retina.directive('articleCard', [ArticleCard]);
retina.directive('scrollToId', [ScrollToId]);

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

        $element.on('mouseover', function() {
            // $element.children('span').removeClass('hide');
        });
    };

    return directive;
}

function ScrollToId() {
    return {
      scope: {
        scrollTo: "@"
      },
      link: function($scope, $elm, $attr) {
        $elm.on('click', function() {
          $('html,body').animate({scrollTop: $($scope.scrollTo).offset().top - 70}, "slow");
        });
      }
    }
}
