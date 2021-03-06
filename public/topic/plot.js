margin = {top: 20, right: 150, bottom: 30, left: 50},
width = $(document).width() - 30 - margin.left - margin.right,
height = $(document).height() - 70 - margin.top - margin.bottom;

function plotGraph(counts, maxVal) {
  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  var color = d3.scale.category10();

  var xAxis = d3.svg.axis().scale(x).orient("bottom");
  var yAxis = d3.svg.axis().scale(y).orient("left");

  var line = d3.svg.line().interpolate("basis").x(function(d) { return x(d.date); }).y(function(d) { return y(d.articles); });
  var area = d3.svg.area().interpolate("basis").x(function(d) { return x(d.date); }).y0(function(d) { return y(d.articles); }).y1(0);

  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var firstSource = counts[0].values;
  firstSource[firstSource.length-1].articles = 0;
  x.domain([firstSource[firstSource.length-1].date, firstSource[0].date]);

  y.domain([0,Math.ceil(1.1*maxVal)]);

  svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

  svg.append("g").attr("class", "y axis").call(yAxis).append("text")
      .attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Articles Posted");


  var city = svg.selectAll(".city").data(counts).enter().append("g").attr("class", "city");

  city.append("path").attr("class", "line").attr("d", function(d) { return line(d.values); });
  city.append("path").attr("class", "area").attr("d", function(d) { return area(d.values); });



  city.append("text").datum(function(d) { return {name: d.name, value: d.values[0]}; })
    .attr("transform", function(d) {return "translate(" + x(d.value.date) + "," + y(d.value.articles) + ")"; }).attr("x", 3).attr("dy", ".35em").attr('class', 'labels')
.text(function(d) { return d.name; });
}