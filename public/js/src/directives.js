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
        var panel = angular.element('<div>').addClass(randomColor());
        var heading = angular.element('<div>').addClass('panel-heading');
        var htag = '<h3>';
        var title = angular.element(htag).text(article.title);
        heading.append(title);
        
        var url = article.img;
        // if (url) {
        //     var thumbnail = angular.element('<div>').addClass('card-img');
        //     thumbnail.css('background-image', 'url(' + url +')');
        //     $element.append(thumbnail);
        // }
        panel.append(heading);
        $element.append(panel);

    };

    function randomColor() {
        var colors = ['panel-primary', 'panel-success', 'panel-warning', 
                        'panel-danger', 'panel-info'];
        return colors[Math.floor(Math.random() * colors.length)];
    }


    return directive;
}



