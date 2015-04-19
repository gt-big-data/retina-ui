var graph;
var smallRad = 3, bigRad = 4;
function myGraph() {
	this.addNode = function (id, group, name) {
		nodes.push({"id": id, "group": group, "tagged": true, "name": name});
	};
	this.update = function() {
		update();
	}
	this.removeNodeObj = function (n) {
		var i = 0;
		while (i < links.length) {
			if ((links[i]['source'] == n) || (links[i]['target'] == n)) {
				links.splice(i, 1);
			}
			else i++;
		}
		nodes.splice(this.findNodeIndex(n.id), 1);
	};
	this.removeLink = function (source, target) {
		for (var i = 0; i < links.length; i++) {
			if (links[i].source.id == source && links[i].target.id == target) {
				links.splice(i, 1);
				break;
			}
		}
	};
	this.tagNodes = function() {
		for(i in nodes) nodes[i].tagged = false;
	};
	this.tagLinks = function() {
		for(i in links) links[i].tagged = false;
	};
	this.removeExtraNodes = function() {
		for(var i = 1; i < nodes.length; i ++) {
			n = nodes[i];
			if(!n.tagged) {this.removeNodeObj(n);}
		}
	};
	this.changeColor = function(newNode, oldNode) {
		newN = this.findNode(newNode);
		oldN = this.findNode(oldNode);
		newN.group = oldN.group;
	};
	this.addLink = function (source, target, value) {
		links.push({"source": this.findNode(source), "target": this.findNode(target), "value": value});
	};

	this.findNode = function (id) {
		for (var i in nodes) {if (nodes[i]["id"] === id) return nodes[i];};
		return -1;
	};

	this.findNodeIndex = function (id) {
		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].id == id) {return i;}
		};
		return -1;
	};

	var w = $(document).width(), h = $(document).height();

	var color = d3.scale.category20();

	var vis = d3.select("body").append("svg:svg").attr("width", w).attr("height", h).attr("id", "svg").attr("pointer-events", "all").attr("viewBox", "0 0 " + w + " " + h).attr("perserveAspectRatio", "xMinYMid").append('svg:g');

	var force = d3.layout.force();
	var nodes = force.nodes(), links = force.links();

	var update = function () {
		var link = vis.selectAll("line").data(links, function (d) {return d.source.id + "-" + d.target.id;});

		link.enter().append("line").attr("id", function (d) { return d.source.id + "-" + d.target.id;}).attr("stroke-width", function (d) { return 1;}).attr("class", "link");
		
		link.exit().remove();

		var node = vis.selectAll("g.node").data(nodes, function (d) {return d.id;});

		var nodeEnter = node.enter().append("g").attr("class", "node");
		nodeEnter.append("svg:circle").attr("r", smallRad).attr("id", function (d) {return d.id;}).attr("class", "node").attr("fill", function(d) { return color(d.group); });
		nodeEnter.append("title").text(function(d) { return d.name; });
		nodeEnter.on('mouseover', function(d){
			d3.select(this).select('circle').attr('r', bigRad);
	    }).on('mouseout', function(d){
			d3.select(this).select('circle').attr('r', smallRad);
	    });

		node.exit().remove();

		force.on("tick", function () {
			node.attr("transform", function (d) {return "translate(" + d.x + "," + d.y + ")";});
			link.attr("x1", function (d) {return d.source.x;}).attr("y1", function (d) {return d.source.y;}).attr("x2", function (d) {return d.target.x;}).attr("y2", function (d) {return d.target.y;});
		});
		force.charge(-40).linkDistance(10).linkDistance( function(d) { return d.value } ).size([w, h]).start(); // Restart the force layout.
	};
}

function startDay() {
	myTime = new Date().getTime(); myTime = myTime;
	graph = new myGraph("#svgdiv");
	$('#whatDay').css('left', (($(document).width()-$('#whatDay').width())/2));
	reloadGraph();
}
function changeDay(which) {
	myTime += which*86400000;
	reloadGraph();
}
function reloadGraph() {
	dateObj = new Date(myTime);
	var fullDate = dateObj.getFullYear()+'-'+(((dateObj.getMonth()+1)<10)?'0':'')+(dateObj.getMonth()+1)+'-'+((dateObj.getDate()<10)?'0':'')+dateObj.getDate();
	$('#whatDay').html(fullDate);
	// $.getJSON("/api/topics/filter?day="+fullDate, function( data ) {
	$.getJSON(fullDate+".json", function( data ) {
		if(data[0]) {mergeGraphs(data[0].graph);}
	});
}

function mergeGraphs(graphData) {
	graph.tagNodes();
	graph.tagLinks();
	newNodes = [];
	for(nod in graphData.nodes) {
		myNode = graphData.nodes[nod];
		if((n = graph.findNode(myNode.id)) != -1) {n.tagged = true;}
		else {graph.addNode(myNode.id, myNode.group, myNode.name); newNodes.push(myNode.id);}
	}
	graph.removeExtraNodes();

	for(i in graphData.edges) {
		myEdge = graphData.edges[i];
		var f1 = $.inArray(myEdge.source, newNodes)!=-1;
		var f2 = $.inArray(myEdge.target, newNodes)!=-1;
		if(f1 || f2) {
			graph.addLink(myEdge.source, myEdge.target, myEdge.value);
			if(!(f1 && f2)) {
				if(f1) {newNode = myEdge.source; oldNode = myEdge.target;}
				else   {newNode = myEdge.target; oldNode = myEdge.source;}
				graph.changeColor(newNode, oldNode);
			}
		}
	}
	graph.update();
	keepNodesOnTop();
}
startDay();
function keepNodesOnTop() {
	$(".node").each(function( index ) {
		var gnode = this.parentNode;
		gnode.parentNode.appendChild(gnode);
	});
}