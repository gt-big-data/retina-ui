var mongoose = require('mongoose');

var qdocSchema = mongoose.Schema({}, {collection: 'qdoc'});

qdocSchema.statics.sourceCounts = function(callback) {
    this.find({'timestamp': {'$gte': oldTime}}).exec(callback);
};

module.exports = qdocSchema;
