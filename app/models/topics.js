var mongoose = require('mongoose');

var topicSchema = mongoose.Schema({});

topicSchema.statics.getTopics = function(callback) {
    this.find({}).exec(callback);
};

topicSchema.statics.getTopicsByDay = function(day, callback) {
    var secondsPerDay = 86400;
    var nextDay = new Date(day.getTime() + secondsPerDay * 1000);

    this.find({
        date: {$lt: nextDay, $gte: day}
    }).exec(callback);
}

module.exports = topicSchema;
