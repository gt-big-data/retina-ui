"use strict"

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var articleSchema = require('../schemas.js').articleSchema;

var clusterSchema = mongoose.Schema({
    clusterName: String,
    articles: [{ type: Schema.Types.ObjectId, ref: 'articles' }]
});

clusterSchema.statics.getCluster  = function(name, callback) {
    this.findOne({'clusterName':name})
        .populate({
            path: 'articles',
            select: 'id title summary categories keywords images source_domain recent_download_date',
            options: {limit:20}
        })
        .exec(callback);
};

clusterSchema.statics.getClusterNames = function(callback) {
    this.distinct('clusterName', callback);
};

exports.clusterSchema = clusterSchema;
