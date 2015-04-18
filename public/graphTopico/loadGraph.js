var myTime = 0;

var width = $(document).width(), height = $(document).height();
var svg = d3.select("body").append("svg").attr("width", width).attr("height", height);
function startDay() {
	myTime = new Date().getTime();
	myTime = myTime;
	reloadGraph();
}
startDay();
function changeDay(which) {
	myTime += which*86400000;
	reloadGraph();
}
function reloadGraph() {
	dateObj = new Date(myTime);
	var fullDate = dateObj.getFullYear()+'-'+(((dateObj.getMonth()+1)<10)?'0':'')+(dateObj.getMonth()+1)+'-'+((dateObj.getDate()<10)?'0':'')+dateObj.getDate();
	$('#whatDay').html(fullDate);
	$.getJSON("/api/topics/filter?day="+fullDate, function( data ) {
		if(data[0]) {
			graph = data[0].graph;
			svg.remove();
			svg = d3.select("body").append("svg").attr("width", width).attr("height", height);


			var color = d3.scale.category20();

			var force = d3.layout.force().charge(-40).linkDistance(10).size([width, height]);

			force.nodes(graph.nodes).links(graph.edges).start();

			var link = svg.selectAll(".link").data(graph.edges).enter().append("line").attr("class", "link").style("stroke-width", function(d) { return Math.sqrt(d.value); });

			var node = svg.selectAll(".node").data(graph.nodes).enter().append("circle").attr("class", "node").attr("r", 3).style("fill", function(d) { return color(d.group); }).call(force.drag);

			node.append("title").text(function(d) { return d.name; });

			force.on("tick", function() {
				link.attr("x1", function(d) { return d.source.x; }).attr("y1", function(d) { return d.source.y; }).attr("x2", function(d) { return d.target.x; }).attr("y2", function(d) { return d.target.y; });
				node.attr("cx", function(d) { return d.x; }).attr("cy", function(d) { return d.y; });
			});
			
		}
		else {
			svg.remove();
		}
	});	
}