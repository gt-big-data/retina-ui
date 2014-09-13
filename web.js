var express = require("express");
var logfmt = require("logfmt");
var request = require("request");
var passport = require("./fb_login");
var app = express();

app.use(logfmt.requestLogger());

app.use(express.static(__dirname + '/public'));

app.get('/api',function(req,res){
	request("http://api.ihackernews.com/page",function(err,response,body){
		res.send(body)
	});
});

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});