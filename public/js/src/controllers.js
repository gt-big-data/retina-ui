'use strict';
/**
  Hi and welcome to controller.js. This is where the masterminds behind your
  views will reside.

  The purpose of a controller is handle all of the logic that holds your view
  together. It handles data loading and user interactions. If you want to
  perform a task when a user clicks a button? Then this is where that code
  should go.
*/
var retina = angular.module('retina');

// Register the controllers with our module.
retina.controller('FeedController', FeedController);
retina.controller('ArticleController', ArticleController);

function FeedController(articles) {
    /**
        The articles parameter is provide by the resolve function that we
        attach to the state in app.js

        In the lines below we assign the articles to this so that we can
        reference it in our models.
     */
    this.page = 1;
    this.articles = articles;
}

function ArticleController(article) {
    this.model = article;
}