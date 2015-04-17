var mongoose = require('mongoose');

var topicSchema = mongoose.Schema({});

topicSchema.statics.getTopics = function(callback) {
    this.find({}).exec(callback);
};

module.exports = topicSchema;