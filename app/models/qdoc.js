var mongoose = require('mongoose');

var qdocSchema = mongoose.Schema({}, {collection: 'qdoc'});

qdocSchema.statics.sourceCounts = function(callback) {
    this.find({'timestamp': {'$gte': oldTime}})
    .populate({
            select: 'id title timestamp'
        }).exec(callback);
};

module.exports = qdocSchema;
