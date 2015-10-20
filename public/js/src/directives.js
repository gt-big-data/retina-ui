var retina = angular.module('retina');

retina.directive('articleList', [ArticleList]);
retina.directive('scrollToId', [ScrollToId]);
retina.directive('articleCard', [ArticleCard]);
retina.directive('articleGrid', [ArticleGrid]);
retina.directive('treeDiagram', ['ArticleService','$state', TreeDiagram])
retina.directive('keywordActivityGraph', ['ArticleService','$state', KeywordActivityGraph])



function ArticleList() {
    var directive = {
        scope: {
            articles: '='
        },
        restrict:'AE',
        replace: true,
        templateUrl: '../../templates/articlelist.html'
    };

    return directive;
}

function ArticleGrid() {
    var directive = {
        scope: {
            articles: '='
        },
        restrict:'AE',
        replace: true,
        templateUrl: '../../templates/articlegrid.html'
    };
    return directive;
}

function ArticleCard() {
  var directive = {
    scope: {
      article: '='
    },
    restrict: 'AE',
    replace: true,
    templateUrl: '../../templates/articlecard.html'
  };
  return directive;
}

function ScrollToId() {
    return {
      scope: {
        scrollTo: '@'
      },
      link: function($scope, $elm, $attr) {
        $elm.on('click', function() {
          $('html,body').animate({scrollTop: $($scope.scrollTo).offset().top - 70}, 'slow');
        });
      }
    }
}

function TreeDiagram() {
  var directive = {
    scope: {
      keyword: '='
    },
    restrict: 'AE',
    replace: true,
    templateUrl: '../../templates/treediagram.html'
  };

  directive.controller = function($scope, ArticleService, $state) {
    $scope.ArticleService = ArticleService;
    $scope.$state = $state;
  };

  directive.link = function($scope, $element, $attrs) {
    $scope.ArticleService.getCoKeywords($scope.keyword)
    .then(function(response) {
        var root = {keyword: $scope.keyword,
                    children: response.data,
                    total: response.data.length};
        var width = $element.width();
        var height = 400;

        var cluster = d3.layout.cluster()
            .size([height, width / 2])
            .separation(function (a, b) {
              return (a.parent == b.parent ? 1 : 2) / a.depth;
            });

        var diagonal = d3.svg.diagonal()
            .projection(function(d) { return [d.y, d.x]; });

        var totals = root.children.map(function(d) {
          return d.total;
        });
        var xScale = d3.scale.linear()
                        .domain([0, d3.max(totals)])
                        .range([0, 1])
                        .clamp(true);

        var svg = d3.select('#tree-diagram').append('svg')
            .attr('width', width)
            .attr('height', height)
          .append('g')
            .attr('transform', 'translate(40,0)');


        var nodes = cluster.nodes(root);
        var links = cluster.links(nodes);

        var link = svg.selectAll('.link')
            .data(links)
          .enter().append('path')
            .attr('class', 'link')
            .attr('d', diagonal)
            .attr('stroke-width', function(d) {
              return xScale(d.target.total) * 20 + 'px';
            });

        var node = svg.selectAll('.node')
            .data(nodes)
          .enter().append('g')
            .attr('class', 'node')
            .attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; })

        node.append('circle')
            .attr('r', function(d) {
              return xScale(d.total) * 12 + 'px';
            });

        node.append('text')
            .attr('dx', function(d) { return d.children ? -12 : 12; })
            .attr('dy', 3)
            .style('text-anchor', function(d) { return d.children ? 'end' : 'start'; })
            .text(function(d) { return d.keyword; })
            .on('click', function(d) {
              $scope.$state.go('main.keyword', {keyword: d.keyword});
            });
    });
  };
  return directive;
}


function KeywordActivityGraph() {
    var directive = {
        scope: {
            keyword: '='
        },
        restrict:'AE',
        replace: true,
        templateUrl: '../../templates/keywordactivitygraph.html'
    };

    directive.controller = function($scope, ArticleService) {
        $scope.ArticleService = ArticleService;

    };

    directive.link = function($scope, $element, $attrs) {
      $scope.ArticleService.getKeywordActivityGraph($scope.keyword, 7).then(function(response) {
          var data = response.data.map(function(d) {
            return {
              total: d.count,
              date: new Date(d.timestamp * 1000)
            }
          });
          var start = d3.min(data, function(d) {return d.date});
          var end = d3.max(data, function(d) {return d.date});
          var pastWeek = d3.time.day.range(start, end, d3.time.day).map(function(d) {
            return {date: d.toLocaleDateString(), total: 0};
          });
          var dateBuckets = d3.map();
          pastWeek.forEach(function(d) {
            dateBuckets.set(d.date, 0);
          })
          data.forEach(function(d) {
            var day = d.date.toLocaleDateString();
            if (dateBuckets.has(day)) {
              var value = dateBuckets.get(day);
              dateBuckets.set(day, value + d.total);
            }
          });
          data = dateBuckets.entries().map(function(d){
            return {
              date: new Date(d.key),
              total: d.value
            }
          });


          var vis = d3.select('#timeseries-graph');

          var MARGIN = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          };
          var WIDTH = $element.width() - MARGIN.left - MARGIN.right;
          var HEIGHT = 400 - MARGIN.bottom;

          var svg = vis.append('svg')
            .attr('width', WIDTH)
            .attr('height', HEIGHT)
            .append('g')
            .attr('transform',
                'translate(' + MARGIN.left + ',' + 0+ ')');

          var xScale = d3.time.scale()
            .domain(d3.extent(data, function(d) {return d.date;}))
            .range([MARGIN.left, WIDTH - MARGIN.right - MARGIN.left]);

          var yScale = d3.scale.linear()
            .domain(d3.extent(data, function(d){return d.total;}))
            .range([HEIGHT - MARGIN.top, MARGIN.bottom]);

          var area = d3.svg.area()
            .x(function(d) {return xScale(d.date);})
            .y0(HEIGHT - MARGIN.bottom)
            .y1(function(d) {return yScale(d.total);});

          var line = d3.svg.line()
            .x(function(d) {return xScale(d.date);})
            .y(function(d) {return yScale(d.total);})
            .interpolate('monotone');

          var yAxis = d3.svg.axis().scale(yScale).orient('left');
          var xAxis = d3.svg.axis().scale(xScale).orient('bottom')
            .ticks(d3.time.day)
            .tickFormat(d3.time.format('%a %d'));

          svg.append('g')
            .attr('class', 'x axis')
            .attr('transform',
                'translate(' + 0 + ',' + (HEIGHT - MARGIN.bottom) + ')')
            .call(xAxis);

          svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + MARGIN.left + ',' + 0 + ')')
            .call(yAxis)

          var path = svg.append("path")
              .datum(data)
              .attr("class", "line")
              .attr('class', 'area')
              .attr('fill', 'none')
              .style('stroke', 'red')
              .style('stroke-width', '3px')
              .attr("d", line);

          var points = svg.selectAll(".point")
              .data(data)
              .enter().append("svg:circle")
              .attr("stroke", "none")
              .attr("fill", 'red')
              .attr("cx", function(d) {
                  return xScale(d.date)
              })
              .attr("cy", function(d) {
                  return yScale(d.total)
              })
              .attr("r", 5);
        });
    };

    return directive;
}