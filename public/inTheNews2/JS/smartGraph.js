function smartGraph() {
	var force = d3.layout.force();
	// var zoom = d3.behavior.zoom();
	// vis.call(zoom);
	var nodes = force.nodes(), links = force.links();
	bilinks = [], realNodes = [], midsToRemove = [];
	var noKeywords;
	var midNodeId = 0;
	charge = -20;
	// linkDistance = 20;
	linkStrength = 5;
	var smallRad = 3, bigRad = 4;
	var transX, transY;
	this.addNode = function (oldNode, isReal) {
		newNode = $.extend(true, {}, oldNode)
		newNode.tagged = true;
		nodes.push(newNode);
		if(isReal) realNodes.push(newNode);
		return newNode;
	};
	this.getTranslation = function() {
		return {'transX': transX, 'transY': transY};
	}
	this.removeNodeObj = function (n) {
		var i = 0;
		while (i < bilinks.length) {
			if((bilinks[i].s == n) || (bilinks[i].t == n)) {
				this.removeLink(bilinks[i].s.id, bilinks[i].m.id);
				this.removeLink(bilinks[i].t.id, bilinks[i].m.id);
				midsToRemove.push(bilinks[i].m.id);
				bilinks.splice(i, 1);
			}
			else i++;
		}
		nodes.splice(this.findNodeIndex(n.id), 1);
		realNodes.splice(this.findRealNodeIndex(n.id), 1);
	};
	this.removeLink = function (real, mid) {
		for (var i = 0; i < links.length; i++) {
			if ((links[i].source.id == real && links[i].target.id == mid) || (links[i].source.id == mid && links[i].target.id == real)) {
				links.splice(i, 1);
				break;
			}
		}
	};
	this.tagNodes = function() {
		for(i in nodes) nodes[i].tagged = false;
	};
	this.removeExtraNodes = function() {
		for(var i = nodes.length-1; i >= 0; i --) {
			n = nodes[i];
			if(!n.isMid && !n.tagged) this.removeNodeObj(n);
		}
	};
	this.removeExtraMids = function() {
		i = 0; while(i < nodes.length) {
			if($.inArray(nodes[i].id, midsToRemove)!=-1) nodes.splice(i, 1);
			else i ++;
		}
	};
	this.changeColor = function(newNode, oldNode) {
		newN = this.findNode(newNode);
		oldN = this.findNode(oldNode);
		newN.group = oldN.group;
	};
	this.addLink = function (source, target, value) {
		mid = this.addNode({'id': 'mid'+(midNodeId), 'isMid': true}, false); midNodeId ++;
		t = this.findNode(target); s = this.findNode(source);
		links.push({"source": s, "target": mid, "other": t, "value": value, "s": source, "t": target});
		links.push({"source": mid, "target": t, "other": s, "value": value});
		bilinks.push({'s': s, 'm': mid, 't': t});
	};

	this.findNode = function (id) {
		for (var i in nodes) {if (nodes[i]["id"] === id) return nodes[i];};
		return nodes[this.findNodeIndex(id)];
	};
	this.findNodes = function (idList) {
		returnList = [];
		for (var i in nodes) {if (idList.indexOf(nodes[i]["id"])!=-1) {returnList.push(nodes[i])}};
		return returnList;
	};
	this.findNodeIndex = function (id) {
		for (var i in nodes) {if (nodes[i]["id"] === id) return i;};
		return -1;
	};
	this.findRealNodeIndex = function(id) {
		for (var i in realNodes) {if (realNodes[i].id === id) return i;};
		return -1;
	};
	this.getMinMax = function() {
		minX = 0, minY = 0, maxX = 0, maxY = 0;
		for (var i = 0; i < nodes.length; i++) {
			minX = Math.min(nodes[i].x, minX); minY = Math.min(nodes[i].y, minY);
			maxX = Math.max(nodes[i].x, maxX); maxY = Math.max(nodes[i].y, maxY);
		}
		return {'minX': minX, 'maxX': maxX, 'minY': minY, 'maxY': maxY};
	}

	this.update = function (whenEnd) {
		var graph = this;
		var link = vis.selectAll(".link").data(bilinks, function (d) {return d.s.id+'-'+d.t.id;});
		linkEnter = link.enter().append("path").attr("class", "link");
		link.exit().remove();

		var node = vis.selectAll("g.node").data(realNodes, function (d) {return d.id;});

		var nodeEnter = node.enter().append("g").attr("class", "node").attr("id", function (d) {return 'g-'+d.id;});
		nodeEnter.append("svg:circle").attr("r", smallRad).attr("id", function (d) {return d.id;}).attr("class", "node").attr("fill", function(d) { return color(d.group); });
		nodeEnter.on('mouseover', function(d){
			d3.select(this).select('circle').attr('r', bigRad); openNotif(d);
		}).on('mouseout', function(d){
			d3.select(this).select('circle').attr('r', smallRad);
			deleteNotif();
		}).on('dblclick', function(d) {window.open(d.url, '_blank').focus();});

		node.exit().remove();

		tickMod = 0; n = 10;
		noKeywords = true;

		force.on("tick", function () {
			if(force.alpha() < 0.02 && noKeywords) {noKeywords = false; whenEnd();}
			if(tickMod%n == n-1) {
				mm = graph.getMinMax(); transX = Math.max(0,-mm.minX); transY = Math.max(0,-mm.minY)+50;
				height = Math.max(dH, (mm.maxY+transY+50)); width = Math.max(dW, (mm.maxX+transY));
				node.attr("transform", function (d) {return "translate(" + (d.x+transX) + "," + (d.y+transY) + ")";});
				link.attr("d", function(d) {
					return "M" + (d.s.x+transX) + "," + (d.s.y+transY)+ "S" + (d.m.x+transX) + "," + (d.m.y+transY)+ " " + (d.t.x+transX) + "," + (d.t.y+transY);
				});
				vis.attr("width", width).attr("height", height);
			}
			tickMod ++;
		});
		force.charge(charge).linkStrength(linkStrength).linkDistance(function(d) {return 3*d.value;}).size([dW, dH]).start();
	};

	this.mergeData = function(graphData, whenEnd) {
		this.tagNodes();
		newNodes = [];
		midsToRemove = [];
		for(nod in graphData.nodes) {
			myNode = graphData.nodes[nod];
			if((n = this.findNode(myNode.id))) {n.tagged = true;}
			else {this.addNode(myNode, true); newNodes.push(myNode.id);}
		}
		this.removeExtraNodes();
		this.removeExtraMids();

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