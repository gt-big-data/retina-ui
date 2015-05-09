var graph;
var graphData;
var vis;
var dH, dH;
var color;
var dayVis1, dayVis2;

function startDay() {
	dW = $(document).width(); dH = $(document).height();
	vis = d3.select("body").append("svg:svg").attr("width", dW).attr("height", dH);
	vis.attr("id", "svg").attr("pointer-events", "all").attr("perserveAspectRatio", "xMinYMid").append('svg:g');
	dayVis1 = vis.append('text').attr("x", 100).attr("y", 150).text('').attr({'class': 'dayText', 'id': 'line1'});
	dayVis2 = vis.append('text').attr("x", 100).attr("y", 200).text('').attr({'class': 'dayText', 'id': 'line2'})
	color = d3.scale.category20();
	myTime = 1430128971991;
	currentDate = new Date(myTime);
	loadTimeline();
	graph = new smartGraph("#svgdiv");
	reloadGraph();
}
function changeDay(time) {
	currentDate = new Date(time);
	$('.keyword').remove();
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
	// $.getJSON("/api/topics/filter?day="+fullDate, function( data ) {
	$.getJSON("json/"+buildFullDate(currentDate)+".json", function( data ) {
		if(data[0]) {
			graphData = data[0].graph;
			graph.mergeData(graphData, placeKeywords);

			keepNodesOnTop();
		}
	}).fail(function(jqXHR, textStatus, errorThrown) {
		graphData = {nodes: [], links: []};
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
			keywordGroups[keyw].push(graphData.nodes[i].group);
		}
	}
	sortedKeyword = Object.keys(keywordGroups).sort(function(a,b){return mode(keywordGroups[b]).count-mode(keywordGroups[a]).count})
	nbKeywords = 30;
	alreadyIn = [];
	yolo = 0;
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
			.text(key).attr("font-size", (5+2*size)+"px").attr("fill", color(modeGroup)).attr('class', 'keyword').attr('opacity', 0).attr('id', key);
			alreadyIn.push([textX, bestTextY]);
		}
	}
	$('.keyword').animate({'opacity': 1}, 400);
	keepNodesOnTop();
}
function openNotif(data) {
	deleteNotif();
	var n = noty({text: '<img src="'+data.img+'" class="artImg" /><b>'+data.name+'</b>', layout: 'bottomLeft', speed: 300});
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