"use strict"

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

userSchema.statics.getUserInfo = function(user, callback) {
    this.findOne({
            '_id': user
        },
        '-_id -uid', callback);
};

userSchema.statics.updateCategories = function(user, category, callback) {
    this.findOneAndUpdate(
        {'_id': user},
        {$push: {'categories': category}},
        {}, callback);

};

userSchema.statics.updateKeywords = function(user, keyword, callback) {
    this.findOneAndUpdate(
        {'_id': user},
        {$push: {'keywords': keyword}},
        {}, callback);
};

userSchema.statics.recordView = function(user, articleID, callback) {
    this.findOneAndUpdate(
        {'_id': user},
        {$push:{'articles': articleID}},
        {}, callback);
};

userSchema.statics.removeCategory = function(user, category, callback) {
    this.findOneAndUpdate(
        {'_id': user},
        {
            $pull: {'category': category}
        },
        {}, callback);
};

userSchema.statics.removeKeyword = function(user, keyword, callback) {
    this.findOneAndUpdate(
        {'_id': user},
        {
            $pull: {'keyword': keyword}
        },
        {}, callback);
};

exports.userSchema = userSchema;