"use strict"
var mongoose = require('mongoose');
var config = require('../config/config');
var db = mongoose.createConnection(config.db('big_data'));
var articleSchema = require('./models/articles.js').articleSchema;
var articles = db.model('cleanarticles', articleSchema);
var clusterSchema = require('./models/clusters.js').clusterSchema;
var clusters = db.model('clusters', clusterSchema);
var topicsSchema = require('./models/topics');
var topics = db.model('graph_topics', topicsSchema);
var qdocSchema = require('./models/qdoc', qdocSchema);
var qdoc = db.model('qdoc', qdocSchema);

exports.getLatestArticles = getLatestArticles;
exports.getArticlesByCategory = getArticleByCategory;
exports.getArticlesByKeyword = getArticlesByKeyword;
exports.getArticlesBySource = getArticlesBySource;
exports.getArticleById = getArticleById;
exports.getRecentCategories = getRecentCategories;
exports.getCluster = getCluster;
exports.getClusterNames = getClusterNames;
exports.recentCategories = recentCategories;
exports.recentKeywords = recentKeywords;
exports.getSources = getSources;
exports.categoryCount = categoryCount;
exports.keywordCount = keywordCount;
exports.getTopics = getTopics;
exports.filterTopics = filterTopics;
exports.sourceCounts = sourceCounts;

//////////////////////////////////////


function getLatestArticles(req, res) {
    var page = parseInt(req.params.page);
    articles.latest(page, function(err, docs) {
        res.json(docs);
    });
}

function getArticleByCategory(req, res) {
    var category = req.params.category;
    articles.getByCategory(category, function(err, docs) {
        res.json(docs);
    });
}

function getArticlesByKeyword(req, res) {
    var keyword = req.params.keyword;
    articles.getByKeyword(keyword, function(err, docs) {
        res.json(docs);
    });
}

function getArticlesBySource(req, res) {
    var source = req.params.source;
    articles.getBySource(source, function(err, docs) {
        res.json(docs);
    });
}

function getRecentCategories(req, res) {
    articles.getRecentCategories(articles, function(err, docs) {
        if (err) {
            res.json({'Error' : err});
        } else {
            res.json({'Data' : docs});
        }
    });
}

function getArticleById(req, res) {
    var id = req.params.id;
    articles.getById(id, function(err, docs) {
        res.json(docs);
    });
}

function recentCategories(req, res) {
    articles.recentCategories(req.params.page, function(err, docs) {
        var categories = docs.map(function(d) {
            return d._id;
        });
        res.json(categories);
    });
}

function recentKeywords(req, res) {
    articles.recentKeywords(req.params.page, function(err, docs) {
        var keywords = docs.map(function(d){
            return d._id;
        });
        res.json(keywords);
    });
}

function getSources(req, res) {
    articles.sources(function(err, docs) {
        res.json(docs);
    });
}

function keywordCount(req, res) {
    articles.keywordCount(function(err, docs) {
        res.send(docs);
    });
}

function categoryCount(req, res) {
    articles.categoryCount(function(err, docs) {
        res.send(docs);
    });
}

function getCluster(req, res) {
    clusters.getCluster(req.params.cluster, function(err, docs) {
        res.json(docs);
    });
}

function getClusterNames(req, res) {
    clusters.getClusterNames(function(err, docs) {
        res.json(docs);
    });
}

function getTopics(req, res) {
    topics.getTopics(function(err, docs) {
        res.json(docs);
    });
}

function filterTopics(req, res) {
    console.log(req.param('day'));
    var day = new Date(req.param('day'));
    topics.getTopicsByDay(day, function(err, docs) {
        res.json(docs);
    });
}

function sourceCounts(req, res) {
    qdoc.getTopics(function(docs) {
        res.json(docs);
    });
}