var crypto = require('crypto'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, mongoose) {

  var LocalUserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
  });

  var hash = function (data) {
    return crypto.createHash('md5').update(data).digest('hex');
  }

  var LocalUser = mongoose.model('LocalUser', LocalUserSchema);

  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  },
  function(username, password, done) {
    LocalUser.findOne({username: username}, function(err, user){
      if (err) {
        return done(err, { message: 'Other Error'});
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.'});
      }
      if (password == user.password) {
        return done(null, user);
      }
      done(null, false, { message: 'Incorrect password.'});
    })
  }));

  app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
                                     failureRedirect: '/fail' }));
}