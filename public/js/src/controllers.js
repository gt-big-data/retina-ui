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
