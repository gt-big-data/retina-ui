'use strict';
var retina = angular.module('retina');

retina.controller('FeedController', FeedController);
retina.controller('ArticleController', ArticleController);
retina.controller('ProfileController', ProfileController);
retina.controller('KeywordController', KeywordController);

FeedController.inject = ['ArticleService'];
function FeedController(ArticleService, articles, trending) {
    this.page = 1;
    this.articles = articles;
    this.trending = trending;
    var totals = trending.map(function(d) {return d.total});
    this.scale = d3.scale.linear()
                 .domain([d3.min(totals) - 10, d3.max(totals)])
                 .range([0, 100]);

    this.loadMoreArticles = function() {
        this.page++;
        ArticleService.latest(this.page).success(function(newArticles) {
            Array.prototype.push.apply(this.articles, newArticles);
        }, this);
    };

    this.getKeyWordWidth = function(keyword) {

    };
}


function ProfileController(user) {
    this.user = user;
}

function ArticleController(article) {
    this.vm = article;
}

function KeywordController($stateParams, related) {
    this.vm = {}
    this.vm.topic = $stateParams.keyword;
    this.vm.related = related;
}
