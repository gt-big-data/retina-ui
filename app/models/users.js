'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    uid: String,
    name: String,
    picture: String,
    categories: {
        type: Array,
        'default': []
    },
    keywords: {
        type: Array,
        'default': []
    },
    articles: {
        type: Array,
        'default': []
    },
});

/**
 * Returns a user
 * @param {string} userId - the id of the requested user
 * @param {callback} callback - the callback to run once the query is completed, 
 * it should take in an error and an object. 
 */
userSchema.statics.getUserInfo = function(userId, callback) {
    this.findOne({})
    .where('_id').equals(userId)
    // dont include the object id or the facebook idea in the response
    .select('-_id -uid')
    .exec(callback);
};

// TODO(simplyfaisal): rewrite the queries in a more declarative way using
// method chaining. This may or may not be possible. It depends on how the
// mongoose api works

/**
 * Appends a category to a users category field
 * @param {string} userId - the id of the requested user
 * @param {string} category - the category to add
 * @param {callback} callback - the callback to run once the query is completed, 
 * it should take in an error and an object. 
 */
userSchema.statics.updateCategories = function(userId, category, callback) {
    this.findOneAndUpdate(
        {'_id': userId},
        {$addToSet: {'categories': category}},
        {}, callback);

};


/**
 * Appends a keyword to a users keyword field
 * @param {string} userId - the id of the requested user
 * @param {string} keyword - the keyword to add
 * @param {callback} callback - the callback to run once the query is completed, 
 * it should take in an error and an object. 
 */
userSchema.statics.updateKeywords = function(userId, keyword, callback) {
    this.findOneAndUpdate(
        {'_id': userId},
        {$addToSet: {'keywords': keyword}},
        {}, callback);
};


/**
 * Records a view of an article by a user
 * @param {string} userId - the id of the requested user
 * @param {string} articleId - the article that was viewed
 * @param {callback} callback - the callback to run once the query is completed, 
 * it should take in an error and an object. 
 */
userSchema.statics.recordView = function(userId, articleId, callback) {
    var toObjectId = mongoose.Types.ObjectId(articleId);
    this.findOneAndUpdate(
        {'_id': userId},
        {$addToSet:{'articles': toObjectId}},
        {}, callback);
};


/**
 * Removes a category from a users category field 
 * @param {string} userId - the id of the requested user
 * @param {string} category - the category to remove
 * @param {callback} callback - the callback to run once the query is completed, 
 * it should take in an error and an object. 
 */
userSchema.statics.removeCategory = function(userId, category, callback) {
    this.findOneAndUpdate(
        {'_id': userId},
        {
            $pull: {'categories': category}
        },
        {}, callback);
};


/**
 * Removes a keyword from a users keyword field 
 * @param {string} userId - the id of the requested user
 * @param {string} keyword - the keyword to remove
 * @param {callback} callback - the callback to run once the query is completed, 
 * it should take in an error and an object. 
 */
userSchema.statics.removeKeyword = function(userId, keyword, callback) {
    this.findOneAndUpdate(
        {'_id': userId},
        {
            $pull: {'keywords': keyword}
        },
        {}, callback);
};

userSchema.statics.viewData = function(callback) {
    this.aggregate([
        {$unwind:'$articles'},
        {$group: {_id:'$articles.title', count:{$sum:1}}},
        {$sort: {count: -1}},
        {$limit: 20}
        ], callback);
};

exports.userSchema = userSchema;