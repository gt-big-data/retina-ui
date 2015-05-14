counts = [];
var parseDate = d3.time.format("%Y%m%d").parse;
// $.getJSON("/api/sourceCounts/", function( data ) {
$.getJSON("data.json", function( data ) {
	var time = Math.floor(new Date().getTime()/1000);
    days = 30;
    dayArray = [];
    for(u = 0; u < days; u ++) {
		var date = new Date((time-86400*u)*1000);
    	dayArray[u] = date;
    }
	for(i in data) {
		art = data[i];
		day = Math.floor((time-art['timestamp'])/86400);
		dayFormat = buildDate(art['timestamp']);
		var uu = -1;
		for(test in counts) {
			if(counts[test].name == art['source']) {uu = test; break;}
		}
		if(uu == -1) {
			uu = counts.length;
			obj = {};
			obj.name = art['source'];
			obj.values = [];
		    for(u = 0; u < days; u ++) {
		    	oneDay = buildDate((time-86400*u));
		    	obj.values.push({articles: 0, date: oneDay});
		    }
			counts.push(obj);
		}
		for(oo in counts[uu].values) {
			if(toStr(counts[uu].values[oo].date) === toStr(dayFormat)) {
				counts[uu].values[oo].articles ++; break;
			}
		}
	}
	plotGraph(counts);
});
function buildDate(timestamp) {
	date = new Date(timestamp*1000);
	l = date.getFullYear()+''+((date.getMonth()<10)?'0':'')+date.getMonth()+''+((date.getDate()<10)?'0':'')+date.getDate();
	return parseDate(l);
}
function toStr(date) {
	return date.getFullYear()+''+((date.getMonth()<10)?'0':'')+date.getMonth()+''+((date.getDate()<10)?'0':'')+date.getDate();
}