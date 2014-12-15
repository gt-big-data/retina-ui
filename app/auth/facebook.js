var passport = require('passport'),
  config = require('./config')('dev')
  FacebookStrategy = require('passport-facebook').Strategy;
  models =  require('./models');

module.exports = function(app) {

  var FbUsers = models.FbUsers;
  
  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL,
    },
    function(accessToken, refreshToken, profile, done){
      FbUsers.findOne({fbId:profile.id},function(err, existingUser){
        if (existingUser) {
          done(null, existingUser);
        }
        else {
          var newUser = new FbUsers({
            fbId: profile.id,
            // email: profile.emails[0].value,
            name: profile.displayName,
            categories: [],
          }).save(function(err, newUser) {
            if (err) {
              throw err;
            }
            done(null , newUser);
          })
        }
      })
  }));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));
}