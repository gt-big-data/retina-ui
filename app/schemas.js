"use strict"

var config = require('../config/config');
var mongoose = require('mongoose');

/**
 * We won't have to write articles to the database, hence the empty schema.
 */
var articleSchema = mongoose.Schema({}, { collection: 'qdoc' });


/**
 * Returns latest articles by date.
 * @param {int} page - the page of articles to return, each page is 20 articles
 * long by default
 */
articleSchema.statics.latest = function(page) {
    return this.find({})
    .limit(20)
    .skip((page - 1) * 20)
    .sort('-timestamp')
    // Exclude the actual text of the article, reduces the amount of data thats
    // being sent back to the client.
    .select('-text').exec();
};


/**
 * Returns an article with a given id
 * @param {string} id - the id to query by
 */
articleSchema.statics.getById = function(id) {
    return this.findOne({})
    .where({_id: id})
    .exec();
};

/**
 * Returns the frequency distribution of keywords.
 */
articleSchema.statics.keywordCount = function() {
    return this.aggregate()
    .limit(200)
    .unwind('keywords')
    .group({_id:'$keywords', count:{$sum:1}})
    .sort({count:-1})
    .limit(50)
    .exec();
};


/**
 * Returns a list of sources.
 */
articleSchema.statics.getSourceList = function() {
    return this.distinct('source').exec();
};


articleSchema.statics.sourceCounts = function(callback) {
    var time = Math.floor(new Date().getTime() / 1000);
    days = 30;
    oldTime = time - days*86400;
    this.find({'timestamp': {'$gte': oldTime}}).select('title source timestamp _id').exec(callback);
};


articleSchema.statics.topicCount = function(topic, callback) {
    this.find({'topic': parseInt(topic)}).select('title keywords source timestamp _id').exec(callback);
};


/**
 * Users
 */
var userSchema = mongoose.Schema({
    uid: String,
    name: String,
    picture: String,
    views: [{type: mongoose.Schema.Types.ObjectId, ref: 'qdoc'}]
}, { collection: 'users' });


/**
 * Returns a user
 * @param {string} userId - the id of the requested user
 */
userSchema.statics.getUserInfo = function(userId) {
    return this.findOne({})
    .where('_id').equals(userId)
    // dont include the object id or the facebook id in the response
    .select('-_id -uid')
    .populate('views')
    .exec();
};

// TODO(simplyfaisal): rewrite the queries in a more declarative way using
// method chaining. This may or may not be possible. It depends on how the
// mongoose api works


/**
 * Records a view of an article by a user
 * @param {string} userId - the id of the requested user
 * @param {string} articleId - the article that was viewed
 * @param {callback} callback - the callback to run once the query is completed,
 * it should take in an error and an object.
 */
userSchema.statics.recordView = function(userId, articleId) {
    this.findByIdAndUpdate(userId,
        {$addToSet: {'views': articleId}},
        {}, function(err, doc) {
            console.log(err);
        });
};

exports.userModel = mongoose.model('users', userSchema);
exports.articleModel = mongoose.model('qdoc', articleSchema);