'use strict';
/*
    We won't have to write articles to the database, hence the empty schema      
*/
var mongoose = require('mongoose');
var articleSchema = mongoose.Schema({});
var config = require('../../config/config');


/**
 * Returns the latest articles by date
 * @param {int} page - the page of articles to return, each page is 20 articles 
 * long by default
 * @param {callback} callback - the callback to run once the query is completed, 
 * it should take in an error and an object. 
 */
articleSchema.statics.latest = function(page, callback) {
    this.find({})
    .limit(20)
    .skip((page - 1) * 20)
    .sort('-recent_download_date')
    // Exclude the actual text of the article, reduces the amount of data thats
    // being sent back to the client.
    .select('-text')
    .exec(callback);

};


/**
 * Returns the articles that match a given category
 * @param {string} category - the category to query by
 * @param {callback} callback - the callback to run once the query is completed,
 *  it should take in an error and an object. 
 */
articleSchema.statics.getByCategory = function(category, callback) {
    this.find({})
    .where('category').equals(category)
    .limit(5)
    .sort('-recent_download_date')
    .select('-text')
    .exec(callback);
};



/**
 * Returns the articles that match a given keyword
 * @param {string} keyword - the keyword to query by
 * @param {callback} callback - the callback to run once the query is completed, it
 * should take in an error and an object. 
 */
articleSchema.statics.getByKeyword = function(keyword, callback) {
    this.find({})
    .where('keyword').equals(keyword)
    .limit(5)
    .sort('-recent_download_date')
    .select('-text')
    .exec(callback);
};


/**
 * Returns the articles that match a given source
 * @param {string} source - the source to query by
 * @param {callback} callback - the callback to run once the query is completed, it
 * should take in an error and an object. 
 */
articleSchema.statics.getBySource = function(source, callback) {
    this.find({})
    .where('source').equals(source)  
    .where('v').equals(config.version)
    .sort('-recent_download_date')
    .select('-text')
    .exec(callback);  
};



/**
 * Returns an article with a given id
 * @param {string} id - the id to query by
 * @param {callback} callback - the callback to run once the query is completed, it
 * should take in an error and an object. 
 */
articleSchema.statics.getById = function(id, callback) {
    this.findOne({})
    .where({_id: id})
    .exec(callback);
};


/**
 * Returns the categories
 * @param {string} id - the id to query by
 * @param {callback} callback - the callback to run once the query is completed, it
 * should take in an error and an object. 
 */
articleSchema.statics.recentCategories = function(page, callback) {
    this.aggregate([
        {$unwind:'$categories'},
        {$group:{_id:'$categories'}},
        {$limit:10},
        {$skip: (page - 1) * 10}
        ], callback);

};


articleSchema.statics.getSimilar = function(keyword, callback) {

    //TODO: Get this to work with multiple keywords
    this.find({})
    .where(keyword).in('$keywords')
    .select('title img download_time keywords id')
    .exec(callback);
};


/**
 * Returns an article with a given id
 * @param {string} id - the id to query by
 * @param {callback} callback - the callback to run once the query is completed, it
 * should take in an error and an object. 
 */
articleSchema.statics.recentKeywords = function(page, callback) {
    this.aggregate([
        {$unwind:'$keywords'},
        {$group:{_id:'$keywords'}},
        {$limit:10},
        {$skip: (page - 1) * 10}
        ], callback);
};

articleSchema.statics.sources = function(callback) {
    this.distinct(
        'source_domain', {
            'v': config.version,
            'source_domain': {
                $ne: null
            }
        }, callback);
};

articleSchema.statics.categoryCount = function(callback) {
    this.aggregate([
        {
            $unwind: '$categories'
        },
        {
            $group: {_id:'$categories', count:{$sum:1}} 
        },
        {
            $match: {count:{$gt:20}}
        },
        {
            $sort:{count:-1}
        },
        {
            $limit: 50
        }
        ], callback);
};

articleSchema.statics.keywordCount = function(callback) {
    this.aggregate([
        {
            $unwind: '$keywords'
        },
        {
            $group: {_id:'$keywords', count:{$sum:1}} 
        },
        {
            $match: {count:{$gt:20}}
        },
        {
            $sort: {count:-1}
        },
        {
            $limit: 50
        }
        ], callback);
};



articleSchema.statics.getRecentCategories = function(articles, callback) {
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
};

exports.articleSchema = articleSchema;

