var mongoose = require('mongoose');

var qdocSchema = mongoose.Schema({}, {collection: 'qdoc'});

qdocSchema.statics.sourceCounts = function(callback) {
//    var time = Math.floor(new Date().getTime() / 1000);
//    days = 30;
//    oldTime = time - days*86400;
//    oldTime = 0;
    counts = {};
//    var initialCount = [];
//    for(u = 0; u < days; u ++) initialCount[u] = 0;
    console.log(this);
    this.find({}).exec(callback);
//	if(!err) {
//		console.log('hello');
//		console.log(data);
//		counts = data;
//	}
//    });
//	counts['cnn'] = initialCount;
//	counts['reuters'] = initialCount;

//	callback(counts);
};

module.exports = qdocSchema;
