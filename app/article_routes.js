'use strict';
var mongoose = require('mongoose');

var articleModel = require('./schemas').articleModel;
var userModel = require('./schemas').userModel;

var clusterSchema = require('./models/clusters.js').clusterSchema;
var clusters = mongoose.model('clusters', clusterSchema);

var topicsSchema = require('./models/topics');
var topics = mongoose.model('graph_topics', topicsSchema);

//////////////////////////////
function getLatestArticleList(req, res) {
    var page = parseInt(req.params.page);
    articleModel.latest(page).then(function(docs) {
        res.json(docs);
    }, function(err) {

    });
}


function getArticleById(req, res) {
    articleModel.getById(req.params.id).then(function(doc) {
        res.json(doc);
        var userId = req.cookies.retinaID;
        if (userId) {
            userModel.recordView(userId, doc._id);
        }
    }, function(err) {

    });
};


function getSourceList(req, res) {
    articleModel.getSourceList().then(function(doc) {
        res.json(doc);
    });
};

function getKeywordCount(req, res){
    articleModel.keywordCount().then(function(docs) {
        res.json(docs);
    }, function(err) {

    });
}

function getCluster(req, res) {
    clusters.getCluster(req.params.cluster, function(err, docs) {
        res.json(docs);
    });
};

function getClusterNames(req, res) {
    clusters.getClusterNames(function(err, docs) {
        res.json(docs);
    });
};

function getTopics(req, res) {
    topics.getTopics(function(err, docs) {
        res.json(docs);
    });
};

function filterTopics(req, res) {
    console.log(req.param('day'));
    var day = new Date(req.param('day'));
    topics.getTopicsByDay(day, function(err, docs) {
        res.json(docs);
    });
};

function sourceCounts(req, res) {
    topics.getTopics(function(err, docs) {
        res.json(docs);
    });
}

function topicCounts(req, res) {
    var topic = parseInt(req.param('topic'));
    articleModel.topicCount(topic, function(err, docs) {
        res.json(docs);
    });
}

module.exports = function(app) {
    app.get('/articles/latest/:page', getLatestArticleList);
    app.get('/articles/:id', getArticleById);
    app.get('/articles/sources', getSourceList);
    app.get('/keywords/count', getKeywordCount)
    app.get('/api/topics', getTopics);
    app.get('/api/topics/filter', filterTopics);
    app.get('/api/sourceCounts', sourceCounts);
    app.get('/api/topicCount', topicCounts);
    app.get('/api/cluster/:cluster', getCluster);
    app.get('/api/cluster/names', getClusterNames);
};

