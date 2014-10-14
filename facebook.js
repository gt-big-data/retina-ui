var passport = require('passport'),
  config = require('./config'),
  FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(app, mongoose) {

  var FbUserSchema = mongoose.Schema({
    fbId: String,
    email: String,
    name: String,
  });

  var FbUsers = mongoose.model('FbUsers', FbUserSchema);

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
            email: profile.emails[0].value,
            name: profile.displayName,
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