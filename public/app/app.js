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
		.state('/explore', {
			url:'/explore',
			templateUrl: 'views/explore.html'
		});
}).run(function($rootScope, $state) {//Used to set navbar buttons as "active" depending on current scope
	$rootScope.$state = $state;
});

app.controller("activeCtrl", function($scope, $location) {
	$scope.isActive = function(route) {
		return route === $location.path();
	}
});

app.controller("displayModal",["$scope",function($scope){
	$scope.toggleArticle = function(articleId) {
		console.log("Toggling article "+articleId);
		$('.modal-screen-cover').toggleClass("modal-screen-cover-show");
		$('#'+articleId).toggleClass("article-modal-show");
	};
	$scope.hideArticles = function() {
		console.log("Hiding articles");
		$('.modal-screen-cover').toggleClass("modal-screen-cover-show");
		$('.article-modal-show').toggleClass("article-modal-show");
	};
	function resizeModal() {
		$(".article-modal").css({"max-height":$(window).height()-40});
		$(".article-modal-content").css({"max-height":$(window).height()-80});
	}
	resizeModal();//Run once
	$(window).resize(function() {//Run on window resize
		resizeModal();
	})
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

app.controller("animateFront",["$scope",function($scope){
	$("#top-panel-pic").bgLoaded({
		afterLoaded : function(){
			$("#top-panel-pic-wrap").css({opacity: 1});
			$("#top-panel-pic").fadeTo(800, .7, function() {
				$("#main-info-1").fadeTo(600, 1, function() {
					$("#main-info-2").fadeTo(600, 1);
				});
			});
		}
	});
}]);

app.controller("animateAbout",["$scope",function($scope){
	var aboutLoaded = false;

	function animateAbout() {
		if (($("#about-point-1").visible(true) || $("#about-point-2").visible(true)) && !aboutLoaded) {
			aboutLoaded = true;
			$("#about-point-1").fadeTo(300, 1, function() {
				$("#about-point-2").fadeTo(300, 1, function() {
					$("#about-point-31").fadeTo(400, 1, function() {
						$("#about-point-31-text").fadeTo(500, 1, function() {
							$("#about-point-32").fadeTo(400, 1, function() {
								$("#about-point-32-text").fadeTo(500, 1, function() {
									$("#about-point-33").fadeTo(400, 1, function() {
										$("#about-point-33-text").fadeTo(500, 1);
									});
								});
							});
						});
					})
				});
			});
		}
	}


	$(document).ready(function() {
		animateAbout();
	})
	$(window).scroll(function() {
		animateAbout();
	})
}])

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
