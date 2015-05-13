"use strict"
/*
    We won't have to write articles to the database, hence the empty schema      
*/
var mongoose = require('mongoose');
var articleSchema = mongoose.Schema({});
var config = require('../../config/config');

articleSchema.statics.latest = function(page, callback) {
  
    var query = this.find({})
    .limit(20)
    .skip((page - 1) * 20)
    .sort('-recent_download_date')
    .select('title img download_time keywords id')
    .exec(callback);

};

//TODO: Enable pagination

articleSchema.statics.getByCategory = function(category, callback) {
    this.find(
        {
            'v': config.version,
            'categories': category
        }, 
        null,
        {
            limit: 20,
            sort: {
                'recent_download_date': -1
            }
        }, callback);    
};

articleSchema.statics.getByKeyword = function(keyword, callback) {
    this.find(
        {
            'v': config.version,
            'keyword': keyword
        }, 
        null,
        {
            limit: 20,
            sort: {
                'recent_download_date': -1
            }
        }, callback);    
};

articleSchema.statics.getBySource = function(source, callback) {
    this.find(
        {
            'v': config.version,
            'source': source
        }, 
        null,
        {
            limit: 20,
            sort: {
                'recent_download_date': -1
            }
        }, callback);    
};

articleSchema.statics.getById = function(id, callback) {
    var query = this.findOne({})
    .where({_id: id})
    .exec(callback);
};

articleSchema.statics.getSimilar = function(keyword, callback) {

    //TODO: Get this to work with multiple keywords
    var query = this.find({})
    .where(keyword).in('$keywords')
    .select('title img download_time keywords id')
    .exec(callback);
};

articleSchema.statics.recentCategories = function(page, callback) {
    this.aggregate([
        {$unwind:'$categories'},
        {$group:{_id:'$categories'}},
        {$limit:10},
        {$skip: (page - 1) * 10}
        ], callback);

};

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

