var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    config = require('../config/config')('prod');
    db = mongoose.createConnection(config.db('big_data'));
    articleSchema = require('./models/articles.js').articleSchema,
    articles =  db.model('articles', articleSchema);

exports.getLatestArticles = function(req, res) {
    articles.find(
        {'v': config.version},
        {},
        {
            limit: 20,
            sort: {'recent_download_date': -1}
        },
        function(err, docs) {
            if (err) {
                throw err;
            }
            res.json(docs);
    });
}

exports.getArticlesByCategory = function(req, res) {
    var category = req.params.category;
    articles.find(
        {'v': config.version, 'categories': category},
        {},
        {
            limit: 20,
            sort: {'recent_download_date': -1}
        },
        function(err, docs) {
            if (err) {
                throw err;
            }
            res.json(docs);
    });
}

exports.getArticlesByKeyword = function(req, res) {
    var keyword = req.params.keyword;
    articles.find(
        {'v': config.version, 'keyword': keyword},
        {},
        {
            limit: 20,
            sort: {'recent_download_date': -1}
        },
        function(err, docs) {
            if (err) {
                throw err;
            }
            res.json(docs);
    });
}

exports.getArticlesBySource = function(req, res) {
    var source = req.params.source;
    console.log(source);
    articles.find(
        {'v': config.version, 'source_domain': source},
        {},
        {
            limit: 20,
            sort: {'recent_download_date': -1}
        },
        function(err, docs) {
            if (err) {
                throw err;
            }
            res.json(docs);
    });
}

exports.getArticleById = function(req, res) {
    var id = req.params.id;
    articles.findOne(
        // return a specific article
        {'v': version, '_id':id},
        {},
        function(err, doc) {
            if (err) {
              throw err;
            }
            res.json(doc);
    });
}

exports.getCategoriesOfMostRecentArticles = function(req, res) {
    articles.distinct(
        'categories',
         {
            'v': version, 
            'categories':{$ne: null},
            'recent_download_date': {$lt: new Date()},
         },
        function(err, docs) {
            res.json(docs);
    });
}

exports.getKeywordsOfMostRecentArticles = function(req, res) {
    articles.distinct(
        'keywords',
        {
            'v': version, 
            'keywords':{$ne: null},
            'recent_download_date': {$lt: new Date()},
        },
        function(err, docs) {
            res.json(docs);
    });
}

exports.getSources = function(req, res) {
    articles.distinct(
        'source_domain',
        {'v': version, 'source_domain':{$ne: null}},
        function(err, docs) {
            res.json(docs);
    });
}