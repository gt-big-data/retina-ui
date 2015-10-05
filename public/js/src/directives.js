var retina = angular.module('retina');

retina.directive('articleList', [ArticleList]);
retina.directive('scrollToId', [ScrollToId]);
retina.directive('articleCard', [ArticleCard]);
retina.directive('articleGrid', [ArticleGrid]);
retina.directive('treeDiagram', ['ArticleService', TreeDiagram])


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

  directive.controller = function($scope, ArticleService) {
    $scope.ArticleService = ArticleService;
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
        totals.push(root.total);

        var xScale = d3.scale.linear()
                        .domain([0, d3.max(totals)])
                        .range([0, 1]);

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
              return xScale(d.total) * 9 + 'px';
            });

        node.append('text')
            .attr('dx', function(d) { return d.children ? -12 : 12; })
            .attr('dy', 3)
            .style('text-anchor', function(d) { return d.children ? 'end' : 'start'; })
            .text(function(d) { return d.keyword; });

    });
  };
  return directive;
}
