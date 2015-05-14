var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y%m%d").parse;

function plotGraph(counts) {
  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  var color = d3.scale.category10();

  var xAxis = d3.svg.axis().scale(x).orient("bottom");
  var yAxis = d3.svg.axis().scale(y).orient("left");

  var line = d3.svg.line().interpolate("basis").x(function(d) { return x(d.date); }).y(function(d) { return y(d.articles); });

  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var firstSource = counts[0].values;
  x.domain([firstSource[firstSource.length-1].date, firstSource[0].date]);

  y.domain([0,200]);

  svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

  svg.append("g").attr("class", "y axis").call(yAxis).append("text")
      .attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Articles Posted");

  var city = svg.selectAll(".city").data(counts).enter().append("g").attr("class", "city");

  city.append("path").attr("class", "line").attr("d", function(d) { return line(d.values); }).style("stroke", function(d) { return color(d.name); });

  city.append("text").datum(function(d) { return {name: d.name, value: d.values[0]}; })
      .attr("transform", function(d) {return "translate(" + x(d.value.date) + "," + y(d.value.articles) + ")"; }).attr("x", 3).attr("dy", ".35em").attr('class', 'labels')
      .text(function(d) { return d.name; }).attr('fill', function(d) { return color(d.name); });

}