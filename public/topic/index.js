counts = [];
var intervalSize = 3*3600;
$(document).ready(function() {
	topic = 1;
	location.search.substr(1).split("&").forEach(function (item) {
		tmp = item.split("=");
		if (tmp[0] == 'topic') topic = parseInt(tmp[1]);
	});
	$.getJSON("/api/topicCount?topic="+topic, function( data ) {
	// $.getJSON("data.json", function( data ) {
		loadGraph(data);
	});
});
function loadGraph(data) {
	var time = Math.floor(new Date().getTime()/1000);
    days = 30;
    dayArray = [];
    keywordCount = {};
    for(u = 0; u < days; u ++) {
		var date = new Date((time-86400*u)*1000);
    	dayArray[u] = date;
    }
    var minTime = data[0]['timestamp'], maxTime = data[0]['timestamp'];
	obj = {name: 'Test', values: []};
	for(i in data) {
		art = data[i];
		minTime = Math.min(art['timestamp'], minTime);
		maxTime = Math.max(art['timestamp'], maxTime);
		for(k in art['keywords']) {
			if(keywordCount[art['keywords'][k]]) keywordCount[art['keywords'][k]] ++;
			else keywordCount[art['keywords'][k]] = 1;
		}
	}
	intervalSize = Math.max(3600, Math.floor((maxTime-minTime)/100));
	sortedWords = getSortedKeys(keywordCount);
	$('#bigName').html(fLetter(sortedWords[0])+' ~ '+fLetter(sortedWords[1])+' ~ '+fLetter(sortedWords[2]));

	minDate = buildDate(minTime);
	maxDate = buildDate(maxTime);
	f = 'dd mmm yyyy hh:MMtt';
	$('#lowerName').html(minDate.format(f)+' &rarr; '+maxDate.format(f));
	obj.name = fLetter(sortedWords[0]);

	hourSpan = Math.ceil((maxTime-minTime)/intervalSize);
	for(var i = hourSpan; i >= 0; i --) {
		obj.values.push({articles: 0, date: buildDate(minTime+intervalSize*i)});
	}

	for(i in data) {
		for(h in obj.values) {
			if(toID(buildDate(data[i]['timestamp'])) === toID(obj.values[h].date)) {
				obj.values[h].articles ++; break;
			}
		}
	}
	sortedDatesByArticleNb = getSortedKeys2(obj.values);
	plotGraph([obj], obj.values[sortedDatesByArticleNb[0]].articles);
}
function buildDate(timestamp) {
	return new Date(timestamp*1000);
}
function fLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function toID(date) {
	return Math.floor(date.getTime()/(1000*intervalSize));
}
function getSortedKeys(obj) {
	var keys = []; for(var key in obj) keys.push(key);
	return keys.sort(function(a,b){return obj[b]-obj[a]});
}
function getSortedKeys2(obj) {
	var keys = []; for(var key in obj) keys.push(key);
	return keys.sort(function(a,b){return obj[b].articles-obj[a].articles});
}