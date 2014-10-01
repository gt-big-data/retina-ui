#Site Design Standards Template
Please feel free to update this if you change how styling works across the site
##Creating a page
###1. Header

    <!DOCTYPE html>
    <html lang="en" ng-app="myapp">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">

        <title>YOUR PAGE TITLE GOES HERE</title>

        <script type="text/javascript" src="/js/angular.min.js"></script>
        <script type="text/javascript" src="/js/app.js"></script>
        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="/js/bootstrap.min.js"></script>

        <div ng-include="'/headerStyle.html'"></div>

      </head>

###2. Body

      <body>
      	<div ng-include="'navbarNoAuth.html'"></div>
        <div class="container container-main">
        YOUR CONTENT GOES HERE
        </div>
        <div ng-include="'/footer.html'"></div>
        <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
        <script src="js/ie10-viewport-bug-workaround.js"></script>
      </body>
    </html>

##Updating the navbar to include a link to your page
###Should the page only be available to logged in users?
* ####If so, edit public/navbar.html
* ####If not, edit public/navbarNoAuth.html

###Editing navbar
####1. Go to the part of the file that looks like:
    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" ng-controller="navbarActive">
        <ul class="nav navbar-nav navbar-right">
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/login">Sign In</a></li>
        </ul>
    </div><!-- /.navbar-collapse -->

####2. Each line `<li><a href="/about">About</a></li>` is a link on the menu.
####3. Decide where in the menu your page should be, and add a similar line with the correct link and title
