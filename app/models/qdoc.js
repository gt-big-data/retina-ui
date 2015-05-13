var mongoose = require('mongoose');

var qdocSchema = mongoose.Schema({});

qdocSchema.statics.sourceCounts = function(callback) {
	var time = Math.floor(new Date().getTime() / 1000);
	days = 30;
	oldTime = time - days*86400;
    counts = {};
    var initialCount = [];
    for(u = 0; u < days; u ++) initialCount[u] = 0;
    this.find({timestamp: {$gte: oldTime}})
	.exec(function(err, data) {
		if(!err) {

		}
    });
	counts['cnn'] = initialCount;
	counts['reuters'] = initialCount;

	callback(counts);
};

module.exports = qdocSchema;