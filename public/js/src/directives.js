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
        var htag = article.img ? '<h4>': '<h1>';
        console.log(htag);
        var title = angular.element(htag).addClass('panel-title')
                    .text(article.title);
        heading.append(title);
        panel.append(heading);
        $element.append(panel);
        /*
            Dom should look like this:
            <div class="panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title"> {{$scope.article.title}}</h3>
                </div>
            </div>
         */
        
        var image = angular.element('<div>')

    };

    function randomColor() {
        var colors = ['panel-primary', 'panel-success', 'panel-warning', 
                        'panel-danger', 'panel-info'];
        return colors[Math.floor(Math.random() * colors.length)];
    }


    return directive;
}



