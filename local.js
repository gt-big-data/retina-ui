var crypto = require('crypto'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
  schema = require('./schema');

var hash = function (data) {
  return crypto.createHash('md5').update(data).digest('hex');
}

module.exports = function(app, mongoose) {

  var LocalUser = schema.LocalUser;

  passport.use(new LocalStrategy(
  function(username, password, done) {
    LocalUser.findOne({username: username}, function(err, user) {
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
                                     failureRedirect: '/fail'}));

  app.post('/signup', function(req, res) {
    var password = req.body.password;
    var username = req.body.username;
    var email = req.body.email;
    console.log(username);
    LocalUser.findOne({username:username}, function(err, user) {
      console.log(user);
      if (err) {
        throw err;
      }
      if (user) {
        throw err;
      }
      else {
        var newUser = new LocalUser({
          username: username,
          password: password,
          email: email,
          categories: [],
        }).save(function(err, newUser) {
          if (err) {
            throw err;
          }
        })
      }
    })
  })
}