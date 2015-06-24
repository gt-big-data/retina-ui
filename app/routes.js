'use strict';
var mongoose = require('mongoose');
var config = require('../config/config');
var db = mongoose.createConnection(config.db('big_data'));
var articleSchema = require('./models/articles.js').articleSchema;
var articles = db.model('cleanarticles', articleSchema);
var clusterSchema = require('./models/clusters.js').clusterSchema;
var clusters = db.model('clusters', clusterSchema);
var topicsSchema = require('./models/topics');
var topics = db.model('graph_topics', topicsSchema);

exports.getLatestArticles = function(req, res) {
    var page = parseInt(req.params.page);
    articles.latest(page, function(err, docs) {
        res.json(docs);
    });
};

exports.getArticleByCategory = function(req, res) {
    var category = req.params.category;
    articles.getByCategory(category, function(err, docs) {
        res.json(docs);
    });
};

exports.getArticlesByKeyword = function(req, res) {
    var keyword = req.params.keyword;
    articles.getByKeyword(keyword, function(err, docs) {
        res.json(docs);
    });
};

exports.getArticlesBySource = function(req, res) {
    var source = req.params.source;
    articles.getBySource(source, function(err, docs) {
        res.json(docs);
    });
};

exports.getRecentCategories = function(req, res) {
    articles.getRecentCategories(articles, function(err, docs) {
        if (err) {
            res.json({'Error' : err});
        } else {
            res.json({'Data' : docs});
        }
    });
};

exports.getArticleById = function(req, res) {
    var id = req.params.id;
    articles.getById(id, function(err, docs) {
        res.json(docs);
    });
};

exports.recentCategories = function(req, res) {
    articles.recentCategories(req.params.page, function(err, docs) {
        var categories = docs.map(function(d) {
            return d._id;
        });
        res.json(categories);
    });
};

exports.recentKeywords = function(req, res) {
    articles.recentKeywords(req.params.page, function(err, docs) {
        var keywords = docs.map(function(d){
            return d._id;
        });
        res.json(keywords);
    });
};


exports.getSources = function(req, res) {
    articles.sources(function(err, docs) {
        res.json(docs);
    });
};

exports.keywordCount = function(req, res) {
    articles.keywordCount(function(err, docs) {
        res.send(docs);
    });
};

exports.categoryCount = function(req, res) {
    articles.categoryCount(function(err, docs) {
        res.send(docs);
    });
};

exports.getCluster = function(req, res) {
    clusters.getCluster(req.params.cluster, function(err, docs) {
        res.json(docs);
    });
};

exports.getClusterNames = function(req, res) {
    clusters.getClusterNames(function(err, docs) {
        res.json(docs);
    });
};

exports.getTopics = function(req, res) {
    topics.getTopics(function(err, docs) {
        res.json(docs);
    });
};

exports.filterTopics = function(req, res) {
    console.log(req.param('day'));
    var day = new Date(req.param('day'));
    topics.getTopicsByDay(day, function(err, docs) {
        res.json(docs);
    });
};

exports.getSimilar = function(req, res) {
    articles.getSimilar(req.params.keyword, function(err, docs) {
        res.json(docs);
    });
};