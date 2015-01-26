/*
    We won't have to write articles to the database, hence the empty schema      
*/
var mongoose = require('mongoose');
var articleSchema = mongoose.Schema({});
var config = require('../../config/config');

articleSchema.statics.latest = function(page, callback) {
    this.find(
        {'v': config.version},
        null,
        {
            limit:  20,
            skip: (page - 1) * 20,
            sort: {
                'recent_download_date': -1
            },
        }, callback);
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
    this.findOne(
        {
            'v': config.version,
            '_id': id
        }, 
        null,
        {
            limit: 20,
            sort: {
                'recent_download_date': -1
            }
        }, callback);    
};

articleSchema.statics.recentCategories = function(callback) {
    this.distinct(
        'categories', {
            'v': config.version,
            'categories': {
                $ne: null
            },
            'recent_download_date': {
                $lt: new Date()
            },
        }, callback);
};

articleSchema.statics.recentKeywords = function(callback) {
    this.distinct(
        'keywords', {
            'v': config.version,
            'keywords': {
                $ne: null
            },
            'recent_download_date': {
                $lt: new Date()
            },
        }, callback);
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

exports.articleSchema = articleSchema;

