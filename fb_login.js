var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: "545078782286873",
    clientSecret: "c8a9f573cd188ef8f55842bcda995614",
    callbackURL: "http://www.example.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    
  }
));

module.exports = passport;