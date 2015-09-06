function smartGraph() {
	charge = -40; linkD = 50;
	var smallRad = 3, bigRad = 4;
	var transX, transY;
	this.addNode = function (oldNode) {
		newNode = $.extend(true, {}, oldNode)
		newNode.tagged = true;
		nodes.push(newNode);
	};
	this.getTranslation = function() {
		return {'transX': transX, 'transY': transY};
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
		toRemove = [];
		for(var i = nodes.length-1; i >= 0; i --) {
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
	this.findNodes = function (idList) {
		returnList = [];
		for (var i in nodes) {if (idList.indexOf(nodes[i]["id"])!=-1) {returnList.push(nodes[i])}};
		return returnList;
	};
	this.findNodeIndex = function (id) {
		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].id == id) {return i;}
		};
		return -1;
	};
	this.getMinMax = function(co) {
		minX = 0, minY = 0, maxX = 0, maxY = 0;
		for (var i = 0; i < nodes.length; i++) {
			minX = Math.min(nodes[i].x, minX); minY = Math.min(nodes[i].y, minY);
			maxX = Math.max(nodes[i].x, maxX); maxY = Math.max(nodes[i].y, maxY);
		}
		return {'minX': minX, 'maxX': maxX, 'minY': minY, 'maxY': maxY};
	}

	var force = d3.layout.force();
	var nodes = force.nodes(), links = force.links();
	var noKeywords;

	this.update = function (whenEnd) {
		var link = vis.selectAll("line").data(links, function (d) {return d.source.id + "-" + d.target.id;});
		var graph = this;
		link.enter().append("line").attr("id", function (d) { return d.source.id + "-" + d.target.id;}).attr("stroke-width", function (d) { return 1;}).attr("class", "link");
		link.exit().remove();

		var node = vis.selectAll("g.node").data(nodes, function (d) {return d.id;});

		var nodeEnter = node.enter().append("g").attr("class", "node").attr("id", function (d) {return 'g-'+d.id;});
		nodeEnter.append("svg:circle").attr("r", smallRad).attr("id", function (d) {return d.id;}).attr("class", "node").attr("fill", function(d) { return color(d.group); });
		nodeEnter.on('mouseover', function(d){
			d3.select(this).select('circle').attr('r', bigRad);
			openNotif(d);
		})
		.on('mouseout', function(d){
			d3.select(this).select('circle').attr('r', smallRad);
			deleteNotif();
		})
		.on('dblclick', function(d) {
			var win = window.open(d.url, '_blank');
			win.focus();
		});

		node.exit().remove();

		tickMod = 0; n = 10;
		noKeywords = true;

		force.on("tick", function () {
			if(force.alpha() < 0.02 && noKeywords) {noKeywords = false; whenEnd();}
			if(tickMod%n == n-1) {
				mm = graph.getMinMax(); transX = Math.max(0,-mm.minX); transY = Math.max(0,-mm.minY)+50;
				height = Math.max(dH, (mm.maxY+transY+50)); width = Math.max(dW, (mm.maxX+transY));
				// node.attr("transform", function (d) {return "translate(" + (d.x+transX) + "," + (d.y+transY) + ")";});
				// link.attr("x1", function (d) {return d.source.x+transX;}).attr("y1", function (d) {return d.source.y+transY;})
				// link.attr("x2", function (d) {return d.target.x+transX;}).attr("y2", function (d) {return d.target.y+transY;});
				// vis.attr("width", width).attr("height", height);
			}
			tickMod ++;
		});
		force.charge(charge).linkDistance(linkD).size([dW, dH]).start();
	};
	this.mergeData = function(graphData, whenEnd) {
		this.tagNodes();
		this.tagLinks();
		newNodes = [];
		for(nod in graphData.nodes) {
			myNode = graphData.nodes[nod];
			if((n = this.findNode(myNode.id)) != -1) {n.tagged = true;}
			else {this.addNode(myNode); newNodes.push(myNode.id);}
		}
		this.removeExtraNodes();

		for(i in graphData.edges) {
			myEdge = graphData.edges[i];
			var f1 = $.inArray(myEdge.source, newNodes)!=-1;
			var f2 = $.inArray(myEdge.target, newNodes)!=-1;
			if(f1 || f2) {
				this.addLink(myEdge.source, myEdge.target, myEdge.value);
				if(!(f1 && f2)) {
					if(f1) {newNode = myEdge.source; oldNode = myEdge.target;}
					else   {newNode = myEdge.target; oldNode = myEdge.source;}
					this.changeColor(newNode, oldNode);
				}
			}
		}
		this.update(whenEnd);
	}
}