var app = angular.module("myapp",[]);

app.controller("stub",["$scope","$http",function($scope,$http){
	$http.get('/stub/6').success(function(data){
		$scope.news = data;
	});
}]);

app.controller("hn",["$scope","$http",function($scope,$http){
  $http.get('/api').success(function(data){
    $scope.news = data;
    $scope.show = function() {
      scope.news.show = true;
    }

  });
}]);

