'use strict';
var retina = angular.module('retina');
retina.controller('FeedController', FeedController);

FeedController.inject = ['ArticleService'];
function FeedController(ArticleService, articles) {
    this.page = 1;
    this.articles = articles.data;

    this.moreArticles = function() {
        this.page++;
        ArticleService.latest(this.page).success(function(newArticles) {
                this.articles = this.articles.concat(newArticles.data);
        }.bind(this));
    };
}

function MainSplash() {
    this.scroll = 0;
    this.scrollParent = 0;
    this.inverseScrollPercent = 100;

    $window.onscroll = function() {
        $scope.scroll = $(window).scrollTop();
        if ($scope.scroll > ($(window).height() / 2)) {
            this.scrollPercent = 100;
        } else {
            this.scrollPercent = (2 * $scope.scroll / $(window).height()) * 100;
        }
        this.inverseScrollPercent = 100 - this.scrollPercent;
    }
}
