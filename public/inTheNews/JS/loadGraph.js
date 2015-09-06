var graph;
var allGraphData, graphData;
var vis;
var dH, dH;
var color;
var dayVis1, dayVis2;
var sources = ['cnn', 'reuters', 'business_insider', 'bbc', 'aljazeera', 'france24', 'venture_beat', 'guardian', 'techcrunch'];
cleanSourceName = {'cnn': 'CNN', 'reuters': 'Reuters', 'business_insider': 'Business Insider', 'bbc': 'BBC', 'aljazeera': 'Aljazeera', 'venture_beat': 'Venture Beat', 'france24': 'France24', 'guardian': 'The Guardian', 'techcrunch': 'TechCrunch'};
var sourceOptions = [];
function startDay() {
	dW = $(document).width(); dH = $(document).height();
	vis = d3.select("body").append("svg:svg").attr("width", dW).attr("height", dH);
	vis.attr("id", "svg").attr("pointer-events", "all").attr("perserveAspectRatio", "xMinYMid").append('svg:g');
	dayVis1 = vis.append('text').attr("x", 100).attr("y", 150).text('').attr({'class': 'dayText', 'id': 'line1'});
	dayVis2 = vis.append('text').attr("x", 100).attr("y", 200).text('').attr({'class': 'dayText', 'id': 'line2'})
	color = d3.scale.category20();
	myTime = new Date().getTime();
	currentDate = new Date(myTime);
	loadTimeline();
	graph = new smartGraph("#svgdiv");
	loadSources();
}
function loadSources() {
	loadSourceOptions();
	var n = 4; margin = 7, tileSize = 35;
	var r = 0, c = 0;
	var toAppend = '';
	for(i in sources) {
		tSrc = sources[i];
		toAppend += '<img src="images/sources/'+tSrc+'.png" onclick="toggleSource(\''+tSrc+'\')" title="'+cleanSourceName[tSrc]+' - '+((sourceOptions[tSrc])?'On':'Off')+'" id="src_'+tSrc+'" class="sourceIcon '+((sourceOptions[tSrc])?'':'inactiveSource')+'" style="top: '+(margin+(tileSize+margin)*r)+'px; left: '+(margin+(tileSize+margin)*c)+'px;" />';
		r ++;
		if(r >= n) {r = 0; c ++; n --;} // yolo
	}
	$('#sources').append(toAppend);
}
function toggleSource(sourceName) {
	if(sourceOptions[sourceName]) { // we're disabling it
		$('#src_'+sourceName).addClass('inactiveSource').attr('title', cleanSourceName[sourceName]+' - Off');
	}
	else {
		$('#src_'+sourceName).removeClass('inactiveSource').attr('title', cleanSourceName[sourceName]+' - On');
	}
	sourceOptions[sourceName] = !sourceOptions[sourceName];
	saveSourceOptions();
	reloadWithSource();
}
function loadSourceOptions() {
	if($.cookie('inTheNewsSources')) {
		options = ($.cookie('inTheNewsSources')).split(';');
		for(opt in options) {
			toks = options[opt].split(',');
			sourceOptions[toks[0]] = (toks[1]=='1');
		}
	}
	else {
		for(i in sources) sourceOptions[sources[i]] = true; // see it all
	}
}
function saveSourceOptions() {
	toStr = []
	for(src in sourceOptions) toStr.push(src+','+((sourceOptions[src])?'1':'0'));
	$.cookie('inTheNewsSources', toStr.join(';'), { expires: 7 });
}
function reloadWithSource() {
	graphData = {nodes: [], edges: []};
	nodes = allGraphData.nodes;
	edges = allGraphData.edges;
	allIds = [];
	for(i in nodes) {
		if(sourceOptions[nodes[i].source]) {
			graphData.nodes.push(nodes[i]);
			console.log(nodes[i].id)
			allIds.push(nodes[i].id);
		}
	}
	for(o in edges) {
		if($.inArray(edges[o]['source'], allIds)!=-1 && $.inArray(edges[o]['target'], allIds)!=-1) {
			graphData.edges.push(edges[o]);
		}
	}
	removeKeywords();
	graph.mergeData(graphData, placeKeywords);
	keepNodesOnTop();
}
function changeDay(time) {
	currentDate = new Date(time);
	removeKeywords();
	reloadGraph();
}
function loadTimeline() {
	toAppend = '';
	today = new Date().getTime();
	var o = 0, st;
	for(var i = 20; i >= 0; i --) {
		thisTime = today-i*86400000;
		dateObj = new Date(thisTime);
		toAppend += '<li><a href="#" alt="'+dateObj.getTime()+'">'+buildSmallDate(dateObj)+'</a></li>';
		o ++;
		if(buildFullDate(dateObj) == buildFullDate(currentDate)) {st = o;}		
	}

	$('#dates').append(toAppend);
	$().timelinr({arrowKeys: 'false', startAt: st, arrowKeys: 'true'});
}
function removeKeywords() {
	$('.keyword').remove();
}
function reloadGraph() {
 	niceDate(currentDate);
 	$.getJSON("/api/topics/filter?day="+buildFullDate(currentDate), function( data ) {
 	// $.getJSON("json/"+buildFullDate(currentDate)+".json", function( data ) {
 		if(data[0]) {
 			allGraphData = data[0].graph;
 			reloadWithSource();
 		}
 	}).fail(function(jqXHR, textStatus, errorThrown) {
 		document.title=errorThrown;
 		graphData = {nodes: [], edges: []};
 		graph.mergeData(graphData, bla);
 	});
 }
function bla() {}
function placeKeywords() {
	noKeywords = false;
	var keywordGroups = [];
	for(i in graphData.nodes) {
		thisK = graphData.nodes[i].keywords;
		for(k in thisK) {
			keyw = thisK[k];
			if(!keywordGroups[keyw]) {keywordGroups[keyw] = [];}
			if(Array.isArray(keywordGroups[keyw])) {
				keywordGroups[keyw].push(graphData.nodes[i].group);
			}
		}
	}
	sortedKeyword = Object.keys(keywordGroups).sort(function(a,b){return mode(keywordGroups[b]).count-mode(keywordGroups[a]).count})
	nbKeywords = Math.floor(graphData.nodes.length/7);
	alreadyIn = [];
	for(u = 0; u < nbKeywords; u ++) {
		key = sortedKeyword[u];
		nodeIdList = [];
		for(i in graphData.nodes) {
			if(graphData.nodes[i].keywords) {
				if(graphData.nodes[i].keywords.indexOf(key) != -1) nodeIdList.push(graphData.nodes[i].id);
			}
		}
		nodeList = graph.findNodes(nodeIdList);
		var textX = 0, textY = 0, groupArray = [];
		for(i in nodeList) {groupArray.push(nodeList[i].group);}
		modeGroup = mode(groupArray).el; size = 0;
		for(i in nodeList) {
			if(nodeList[i].group == modeGroup) {
				textX += nodeList[i].x; textY += nodeList[i].y;	size ++;
			}
		}
		textX /= size; textY /= size;
		bestTextY = textY;
		draw = false;
		var minDist = 0;
		for(posY = -1; posY <= 1; posY ++) {
			thisTextY = textY + posY*25;
			thisMinDist = 100000; validPos = true;
			for(o in alreadyIn) {
				thisMinDist = Math.min((Math.pow((textX-alreadyIn[o][0]),2)+Math.pow((thisTextY-alreadyIn[o][1]),2)), thisMinDist);
				if(thisMinDist < 500) {validPos = false; break;}
			}
			if(validPos && thisMinDist > minDist) {
				bestTextY = thisTextY; minDist = thisMinDist;
				draw = true;
			}
		}
		if(draw) {
			var keyword = vis.append('text');
			var translations = graph.getTranslation();
			keyword.attr("x", (textX+translations.transX)).attr("y", (bestTextY+translations.transY))
			.text(key).attr("font-size", (15+2*size)+"px").attr("fill", color(modeGroup)).attr('class', 'keyword').attr('opacity', 0).attr('id', key);
			alreadyIn.push([textX, bestTextY]);
		}
	}
	$('.keyword').animate({'opacity': 1}, 400);
	keepNodesOnTop();
}
function openNotif(data) {
	deleteNotif();
	noty({text: '<img src="images/sources/'+data.source+'.png" class="artImg" /><b>'+data.name+'</b><div class="dblClickInfo">Double click to open article</div>', layout: 'bottomLeft', speed: 300});
}
function deleteNotif() {
	$('.noty_bar').parent().remove();
}
function keepNodesOnTop() {
	$(".node").each(function( index ) {
		var gnode = this.parentNode;
		gnode.parentNode.appendChild(gnode);
	});
}
function mode(array) {
	if(array.length == 0)
		return null;
	var modeMap = {};
	var maxEl = array[0], maxCount = 1;
	for(var i = 0; i < array.length; i++) {
		var el = array[i];
		if(modeMap[el] == null) modeMap[el] = 1;
		else modeMap[el]++;	
		if(modeMap[el] > maxCount) {
			maxEl = el; maxCount = modeMap[el];
		}
	}
	return {'el': maxEl, 'count': maxCount};
}
