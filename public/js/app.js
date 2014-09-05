var app = angular.module("myapp",[]);
    app.controller("hn",["$scope","$http",function($scope,$http){
    	$http.get('/api').success(function(data){
    		$scope.news = data;
    	});
    }]);
