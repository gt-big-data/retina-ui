var retina = angular.module('retina');

retina.directive('articleList', [ArticleList]);
retina.directive('scrollToId', [ScrollToId]);
retina.directive('articleCard', [ArticleCard]);
retina.directive('articleGrid', [ArticleGrid]);


function ArticleList() {
    var directive = {
        scope: {
            articles: '='
        },
        restrict:'AE',
        replace: true,
        templateUrl: '../../templates/articlelist.html'
    };

    return directive;
}

function ArticleGrid() {
    var directive = {
        scope: {
            articles: '='
        },
        restrict:'AE',
        replace: true,
        templateUrl: '../../templates/articlegrid.html'
    };
    return directive;
}

function ArticleCard() {
  var directive = {
    scope: {
      article: '='
    },
    restrict: 'AE',
    replace: true,
    templateUrl: '../../templates/articlecard.html'
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
