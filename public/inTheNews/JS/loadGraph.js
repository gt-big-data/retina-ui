var graph;
var graphData;
var vis;
var dH, dH;
var color;

function startDay() {
	dW = $(document).width(); dH = $(document).height();
	vis = d3.select("body").append("svg:svg").attr("width", dW).attr("height", dH);
	vis.attr("id", "svg").attr("pointer-events", "all").attr("perserveAspectRatio", "xMinYMid").append('svg:g');
	color = d3.scale.category20();
	myTime = new Date().getTime();
	myTime = myTime;
	myTime -= 4*86400000; // to remove
	graph = new smartGraph("#svgdiv");
	$('#whatDay').css('left', (($(document).width()-$('#whatDay').width())/2));
	reloadGraph();
}
function changeDay(which) {
	myTime += which*86400000;
	removeKeywords();
	reloadGraph();
}
function removeKeywords() {
	$('.keyword').remove();
}
function reloadGraph() {
	dateObj = new Date(myTime);
	var fullDate = dateObj.getFullYear()+'-'+(((dateObj.getMonth()+1)<10)?'0':'')+(dateObj.getMonth()+1)+'-'+((dateObj.getDate()<10)?'0':'')+dateObj.getDate();
	$('#whatDay').html(fullDate);
	// $.getJSON("/api/topics/filter?day="+fullDate, function( data ) {
	$.getJSON("json/"+fullDate+".json", function( data ) {
		if(data[0]) {
			graphData = data[0].graph;
			graph.mergeData(graphData, placeKeywords);

			keepNodesOnTop();
		}
	});
}
function placeKeywords() {
	var keywordCounts = [];
	for(i in graphData.nodes) {
		thisK = graphData.nodes[i].keywords;
		for(k in thisK) {
			if(!keywordCounts[thisK[k]]) {keywordCounts[thisK[k]] = 0;}
			keywordCounts[thisK[k]] ++;
		}
	}
	sortedKeyword = Object.keys(keywordCounts).sort(function(a,b){return keywordCounts[b]-keywordCounts[a]})
	nbKeywords = 30;
	alreadyIn = [];
	for(u = 0; u < nbKeywords; u ++) {
		key = sortedKeyword[u];
		nodeIdList = [];
		for(i in graphData.nodes) {
			if(graphData.nodes[i].keywords.indexOf(key) != -1) nodeIdList.push(graphData.nodes[i].id);
		}
		nodeList = graph.findNodes(nodeIdList);
		var textX = 0, textY = 0, groupArray = [];
		for(i in nodeList) { groupArray.push(nodeList[i].group);}
		draw = true;
		modeGroup = mode(groupArray); size = 0;
		for(i in nodeList) {
			if(nodeList[i].group == modeGroup) {
				textX += nodeList[i].x; textY += nodeList[i].y;	size ++;
			}
		}
		textX /= size; textY /= size;

		for(o in alreadyIn) {
			dist = Math.pow((textX-alreadyIn[o][0]),2)+Math.pow((textY-alreadyIn[o][1]),2);
			if(dist < 500) {draw = false; break;}
		}
		if(draw) {
			var keyword = vis.append('text');
			var translations = graph.getTranslation();
			keyword.attr("x", (textX+translations.transX)).attr("y", (textY+translations.transY)).text(key).attr("font-size", (5+2*size)+"px").attr("fill", color(modeGroup)).attr('class', 'keyword').attr('display', 'none').attr('id', key);
			$('#'+key).fadeIn(1000);
			alreadyIn.push([textX, textY]);
		}
	}
	keepNodesOnTop();
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
    for(var i = 0; i < array.length; i++)
    {
    	var el = array[i];
    	if(modeMap[el] == null)
    		modeMap[el] = 1;
    	else
    		modeMap[el]++;	
    	if(modeMap[el] > maxCount) {
    		maxEl = el; maxCount = modeMap[el];
    	}
    }
    return maxEl;
}