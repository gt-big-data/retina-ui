var retina = angular.module('retina');

retina.directive('simpleList', ['ArticleService', SimpleList]);
retina.directive('mediaList', ['ArticleService', MediaList]);
retina.directive('panel', Panel);
retina.directive('picturePanel', PicturePanel);
retina.directive('card', ['ArticleService', Card]);

function SimpleList(ArticleService) {

    var directive = {
        scope: {
            getArticles: '&'
        },
        restrict: 'AE',
        replace: true,
        templateUrl: 'templates/simple-list.html',
    };

    directive.controller = function($scope, ArticleService) {
        console.log('SimpleList');
        $scope.articles = $scope.getArticles(5);
        // var NUM_ARTICLES = 10;
        // var articleService = ArticleService;
        // $scope.articles = [];
        // articleService.request(function(articles) {
        //     for (var i = 0; i < NUM_ARTICLES; i++) {
        //         $scope.articles.push(articles.pop()); 
        //     }
        // })
    };

    directive.link = function($scope, $elem, $attrs) {

    };

    return directive;
}


function MediaList(ArticleService) {

    var directive = {
        scope: {},
        restrict: 'AE',
        replace: true,
        templateUrl: 'templates/media-list.html',
    };

    directive.controller = function($scope, ArticleService) {
        var articleService = ArticleService;
        $scope.articles = [];
        articleService.request(function(articles) {
            for (var i = 0; i < 5; i++) {
                $scope.articles.push(articles.pop()); 
            }
        })
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
        templateUrl: 'templates/panel.html',
    };

    directive.controller = function($scope) {
    };

    directive.link = function($scope, $elem, $attrs) {

    };

    return directive;
}

function PicturePanel() {

    var directive = {
        scope: {
            article: '='
        },
        restrict: 'AE',
        templateUrl: 'templates/picture-panel.html',
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
        var articleService = ArticleService;
        $scope.article = [];
        articleService.request(function(articles) {
            $scope.article = articles.pop();
        })
       
    };

    directive.link = function($scope, $elem, $attrs) {

    };

    return directive;
}