'use strict';

/**
 * First take a cursory glance at the code.
 *
 * Makes no sense right? No worries we'll sort everything out. Read on.
 *
 * This is app.js, the heart of our client side application.
 * In this file we declare our module (retina) and any dependencies that it
 * relies on.
 *
 * We also define our states and their many attributes. Our simple application
 * is divided into 3 distinct states (home, feed, and article). Each state
 * has a few attributes:
 *  url: declares the  url that the state is matched with
 *  templateUrl: declares the HTML file to use to provide the view
 *  controller: defines which controller should be associated with the view
 *  controllerAs: defines the variable in the view that we will use to access
 *       our controller
 *  resolve: declares all of the necessary actions and data that need to be
 *      available before we transition to our view
 *
 * The home state is relatively simple. It just displays the landing page and
 * provides a link to the feed. It really doesn't need any additional data.
 *
 * The feed and article states are a bit more complex. In order to show the
 * user the state we need to have data. But what happens if the data is not yet
 * available? There are many ways to approach this, but the way that we will
 * do it here is by waiting on the data to arrive, THEN, transitioning to the
 * state. This is where we use the resolve attribute.
 *
 * But this still begs the question: where exactly do we get our data? Head
 * over to services.js to find out.
 */
var retina = angular.module('retina', ['ui.router']);
retina.config(function($stateProvider, $urlRouterProvider) {
    /**
        Have you ever been on a website and messed around with the URL?
        Sometimes your changes work and redirect to the proper page. But what
        happens if the url that you enter is not valid? The following line of
        code simply says that if the route that is entered does not match any
        of our states then simply redirect to the home state.
    */
	$urlRouterProvider.otherwise('home');

    /*
        The following lines declare our states
    */
	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: '../../views/home.html',
	})
    .state('feed', {
        url:'/feed',
        templateUrl: '../../views/feed.html',
        /**
            FeedController is a controller that we have defined in controller.js.
            Go check it out to see what it does.
        */
        controller: 'FeedController',
        controllerAs: 'feed',
        resolve: {
            articles: function(ArticleService) {
                    /**
                        How can you use article service to get the latest
                        articles?
                    */
                    return;
            }
        }
    })
    .state('article', {
        url:'/article/:id',
        templateUrl: '../../views/article.html',
        controller: 'ArticleController',
        controllerAs: 'article',
        resolve: {
            article: function($stateParams, ArticleService) {
                /**
                    How can you use article service to get the data for a
                    specific article?

                    Hint: You can get the specific id for an article by
                    accessing the id field of $stateParams ($stateParams.id)
                */
                return;
            }
        }
    });
});