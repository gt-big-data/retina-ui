var retina = angular.module('retina');

retina.directive('articleList', [ArticleList])
retina.directive('scrollToId', [ScrollToId]);

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
