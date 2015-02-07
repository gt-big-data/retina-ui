var app = angular.module("myapp",['ui.router','wu.masonry','ui.bootstrap']);

app.run(["$rootScope","$state","$stateParams",function($rootScope,$state,$stateParams){
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);

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
			templateUrl: 'views/feed.html'
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
		.state('preferences', {
			url:'/preferences',
			templateUrl: 'views/preferences.html'
		})
		.state('profile', {
			url:'/profile',
			templateUrl: 'views/profile.html'
		})
}).run(function($rootScope, $state) {//Used to set navbar buttons as "active" depending on current scope
	$rootScope.$state = $state;
});

app.controller("activeCtrl", function($scope, $location) {
	$scope.isActive = function(route) {
		return route === $location.path();
	}
});

app.controller("displayModal",["$scope",function($scope){
	$scope.showArticle = function(articleId) {
		console.log("Showing article "+articleId);
		$('#'+articleId).modal('show');
	};
	$scope.hideArticle = function(articleId) {
		console.log("Hiding article "+articleId);
		$('#'+articleId).modal('hide');
	};
}]);

app.controller("sizeNewsNav",["$scope",function sizeNewsNav($scope) {//This probably doesn't need to be as big
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

app.controller("catchNewsNav",["$scope",function scrollFixedTop() {//Catches news navbar at top of screen (right under main navbar)
	var changeFixedTop = function() {
		var fixedTopDiv = $(".category-select");
		var scrollTop = $(window).scrollTop();
		var offset = $(".category-select-anchor").offset().top - 54;
		if(scrollTop > offset) {
				fixedTopDiv.css({
						position: "fixed",
						top: "54px"
				});
		} else {
			fixedTopDiv.css({
				position: "relative",
				top: ""
			});
		}
	};
	$(window).scroll(changeFixedTop);
}]);

app.controller("loadContactForm",["$scope",function($scope){
	$(document).ready(function(){
		console.log("test");
		$.getScript("https://secure.jotform.us/jsform/42496913808162");
	})
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
