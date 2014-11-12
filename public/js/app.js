var app = angular.module("myapp",['ui.router','wu.masonry']);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'partials/index.html'
		})
		.state('feed', {
			url: '/feed',
			abstract: true,
			templateUrl: 'partials/feed.html'
		})
		.state('feed.default', {
			parent: 'feed',
			url: '',
			templateUrl: 'partials/feed-part-default.html'
		})
		.state('feed.mini', {
			parent: 'feed',
			url: '/mini',
			templateUrl: 'partials/feed-part-mini.html'
		})
		.state('about', {
			url: '/about',
			templateUrl: 'partials/about.html'
		})
		.state('contact', {
			url: '/contact',
			templateUrl: 'partials/contact.html'
		})
		.state('login', {
			url: '/login',
			templateUrl: 'partials/login.html'
		})
		.state('start', {
			url: '/start',
			templateUrl: 'partials/start.html'
		})
		.state('signUp', {
			url: '/Sign Up',
			templateUrl: 'partials/Sign Up.html'
		})
		.state('query', {
			url: '/query',
			templateUrl: 'partials/query.html'
		})
		.state('settings', {
			url: '/settings',
			templateUrl: 'partials/settings.html'
		})
}).run(function($rootScope, $state) {//Used to set navbar buttons as "active" depending on current scope
	$rootScope.$state = $state;
});

app.controller("activeCtrl", function($scope, $location) {
	$scope.isActive = function(route) {
		return route === $location.path();
	}
})

app.controller("stub",["$scope","$http",function($scope,$http){
	$http.get('/latest').success(function(data){
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

app.controller("resizeFeedMiniIcons",["$scope", function($scope){
	setTimeout(function() {
		var sph = $('.alt-stub-photo').width();
		$('.alt-stub-photo').css({'height': sph + 'px'});
	}, 0);
}])

app.controller("sizeNewsNav",["$scope",function sizeNewsNav($scope) {
		if(fontsLoaded !== true) {//Wait till fonts are loaded
			console.log("Fonts aren't loaded yet")
			setTimeout(sizeNewsNav, 50);//Recursion!
			return;
		}
		else {//Fonts are loaded, proceed!
			console.log("Resizing news-nav-items")
			var navWidth = 0;
			$("#news-nav-items li").each(function() {
				navWidth = navWidth + $(this).width() + 30;//30 pixels for margin-right; have to do it this way because of WebKit bug
			})
			$("#news-nav-items").css({"width":navWidth+30,"visibility":"visible"}).hide().fadeIn("slow");//30 pixels for padding-left

			$(document).ready(function() {//Runs again when document has finished loading (I did this to fix a bug on some mobile devices but its still occuring)
				console.log("Resizing news-nav-items (page loaded)")
				var navWidth = 0;
				$("#news-nav-items li").each(function() {
					navWidth = navWidth + $(this).width() + 30;//30 pixels for margin-right; have to do it this way because of WebKit bug
				})
				$("#news-nav-items").css("width",navWidth+30);//30 pixels for padding-left
			});

			$(window).resize(function() {//Runs again when window is resized
				console.log("Resizing news-nav-items (page resized)")
				var navWidth = 0;
				$("#news-nav-items li").each(function() {
					navWidth = navWidth + $(this).width() + 30;//30 pixels for margin-right; have to do it this way because of WebKit bug
				})
				$("#news-nav-items").css("width",navWidth+30);//30 pixels for padding-left
			})
		}
}]);

app.directive('scrollToId', function() {
  return {
    scope: {
      scrollTo: "@"
    },
    link: function(scope, $elm,attr) {
      $elm.on('click', function() {
        $('html,body').animate({scrollTop: $(scope.scrollTo).offset().top - 54}, "slow");
      });
    }
  }
})
