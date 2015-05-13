var mongoose = require('mongoose');

var qdocSchema = mongoose.Schema({}, {collection: 'qdoc'});

qdocSchema.statics.sourceCounts = function(callback) {
    var time = Math.floor(new Date().getTime() / 1000);
    days = 30;
    oldTime = time - days*86400;
    counts = {};
    var initialCount = [];
    for(u = 0; u < days; u ++) initialCount[u] = 0;
    this.find({'timestamp': {'$gte': oldTime}}).exec(function(err, data) {
        if(!err) {

			art = data[i];
//			console.log(data[i]);
			console.log(data[i].keys());
			days = Math.floor((time- art['timestamp'])/(86400));
	//		if(counts[art['source']]) {counts[art['source']] = initialCount;}
	//		counts[art['source']][days] ++;
		}
//	    console.log(data);
        }
    });
    callback(counts);
};

module.exports = qdocSchema;
