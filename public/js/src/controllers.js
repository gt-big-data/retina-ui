'use strict';
var retina = angular.module('retina');

retina.controller('FeedController', FeedController);
retina.controller('ArticleController', ArticleController);

FeedController.inject = ['ArticleService'];
function FeedController(ArticleService, articles) {
    this.page = 1;
    this.articles = articles;

    this.loadMoreArticles = function() {
        this.page++;
        ArticleService.latest(this.page).success(function(newArticles) {
            Array.prototype.push.apply(this.articles, newArticles);
        }, this);
    };
}


function ArticleController(article) {
    this.vm = article;
}