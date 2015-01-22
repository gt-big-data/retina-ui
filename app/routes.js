var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config/config');
var db = mongoose.createConnection(config.db('big_data'));
var articleSchema = require('./models/articles.js').articleSchema;
var articles = db.model('articles', articleSchema);

exports.getLatestArticles = function(req, res) {
    var page = parseInt(req.params.page);
    articles.find({
            'v': config.version
        }, 
        {}, 
        {
            limit: page  * 20,
            skip: (page - 1) * 20,
            sort: {
                'recent_download_date': -1
            }
        },
        function(err, docs) {
            if (err) {
                throw err;
            }
            res.json(docs);
        });
};

exports.queryArticles = function(req, res) {
    var categories = JSON.parse(req.param('categories'));
    var keywords = JSON.parse(req.param('keywords'));
    articles.find({
            'v': config.version,
            'categories': categories,
            'keywords': keywords
        }, 
        {}, 
        {
            limit: 20,
            sort: {
                'recent_download_date': -1
            }
        },
        function(err, docs) {
            if (err) {
                throw err;
            }
            req.json(docs);
        });
};

exports.getArticlesByCategory = function(req, res) {
    var category = req.params.category;
    articles.find({
            'v': config.version,
            'categories': category
        }, 
        {},
        {
            limit: 20,
            sort: {
                'recent_download_date': -1
            }
        },
        function(err, docs) {
            if (err) {
                throw err;
            }
            res.json(docs);
        });
};

exports.getArticlesByKeyword = function(req, res) {
    var keyword = req.params.keyword;
    articles.find({
            'v': config.version,
            'keyword': keyword
        }, 
        {}, 
        {
            limit: 20,
            sort: {
                'recent_download_date': -1
            }
        },
        function(err, docs) {
            if (err) {
                throw err;
            }
            res.json(docs);
        });
};

exports.getArticlesBySource = function(req, res) {
    var source = req.params.source;
    console.log(source);
    articles.find({
            'v': config.version,
            'source_domain': source
        }, 
        {}, 
        {
            limit: 20,
            sort: {
                'recent_download_date': -1
            }
        },
        function(err, docs) {
            if (err) {
                throw err;
            }
            res.json(docs);
        });
};

exports.getArticleById = function(req, res) {
    var id = req.params.id;
    articles.findOne(
        // return a specific article
        {
            'v': config.version,
            '_id': id
        }, 
        {},
        function(err, doc) {
            if (err) {
                throw err;
            }
            res.json(doc);
        });
};

exports.getCategoriesOfMostRecentArticles = function(req, res) {
    var page = req.params.page;
    articles.distinct(
        'categories', {
            'v': config.version,
            'categories': {
                $ne: null
            },
            'recent_download_date': {
                $lt: new Date()
            },
        },
        function(err, docs) {
            res.json(docs.slice(0, 20));
        });
};

exports.getKeywordsOfMostRecentArticles = function(req, res) {
    articles.distinct(
        'keywords', {
            'v': config.version,
            'keywords': {
                $ne: null
            },
            'recent_download_date': {
                $lt: new Date()
            },
        },
        function(err, docs) {
            console.log(docs);
            res.json(docs.slice(0, 20));
        });
};

exports.getSources = function(req, res) {
    articles.distinct(
        'source_domain', {
            'v': config.version,
            'source_domain': {
                $ne: null
            }
        },
        function(err, docs) {
            res.json(docs.slice(0, 10));
        });
};