"use strict";

var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var articleSchema = require('./articles');

var cleanArticleSchema = Schema({});

var config = require('../../config/config');

cleanArticleSchema.statics.getRecentCategories = function(articles, callback) {
    this.aggregate([
        {$sort: {download_time: -1}},
        {$group: {_id: '$category', count: {$sum: 1}, 'mostRecentArticle' : {$first: {_id: '$_id', title: '$title', download_time: '$download_time', category: '$category'}}}},
    ])
    .exec(function(err, categories) {
        if (err) {
            return callback(err, null);
        }

        var results = Object.keys(categories).map(function(category) {
            var categoryInfo = categories[category];
            return {
                category: categoryInfo.mostRecentArticle.category,
                title: categoryInfo.mostRecentArticle.title,
                download_time: categoryInfo.mostRecentArticle.download_time,
                articleId: categoryInfo.mostRecentArticle._id
            };
        });

        var articleIds = results.map(function(category) {return category.articleId;});
        articles.find({'_id' : {$in: articleIds}}, {images: 1}, function(err, articles) {
            if (err) {
                return callback(err, null);
            }

            var articlesById = {};
            articles.forEach(function(article) {articlesById[article._id] = article;});

            results.forEach(function(category) {
                var article = articlesById[category.articleId].toObject();
                category.img = article.images[0];
            });

            callback(null, results);
        });
    });
}

module.exports = cleanArticleSchema;