var mongoose = require('mongoose');

var qdocSchema = mongoose.Schema({}, {collection: 'qdoc'});

qdocSchema.statics.sourceCounts = function(callback) {
    var time = Math.floor(new Date().getTime() / 1000);
    days = 30;
    oldTime = time - days*86400;
    this.find({'timestamp': {'$gte': oldTime}}).select('title source timestamp _id').exec(callback);
};
qdocSchema.statics.topicCount = function(topic, callback) {
    this.find({'topic': topic}).select('title keywords source timestamp _id').exec(callback);
};

module.exports = qdocSchema;
