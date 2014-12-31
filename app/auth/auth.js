var passport = require('passport');
var mongoose = require('mongoose');
var config = require('../../config/config')('dev');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google').Strategy;
var db = mongoose.createConnection(config.db('big_data'));
var userSchema = require('../models/users').userSchema;
var Users = db.model('users', userSchema);


  
passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL,
        },
        function(accessToken, refreshToken, profile, done) {
            Users.findOne({
                uid: profile.id
            }, function(err, existingUser) {
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    var newUser = new Users({
                        uid: profile.id,
                        name: profile.firstName,
                        categories: [],
                        keywords: [],
                        articles: [],
                    }).save(function(err, newUser) {
                        if (err) {
                            throw err;
                        }
                        done(null, newUser);
                    });
                }
            });
        })
);

passport.use(new GoogleStrategy({
            returnURL: config.google.callbackURL,
            realm: config.google.realm,
        },
        function(identifier, profile, done) {
            User.findOrCreate({
                openId: identifier
            }, function(err, user) {
                done(err, user);
            });
        }
    )
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Users.find({'id':id}, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;