var passport = require('passport');
var mongoose = require('mongoose');
var config = require('../../config/config');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google').Strategy;
var db = mongoose.createConnection(config.db('big_data'));
var Users = require('../schemas').userModel;

passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL,
            profileFields: ['id', 'picture.type(large)', 'displayName']
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
                        name: profile.displayName,
                        picture: profile.photos ? profile.photos[0].value : null,
                        views: [],
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

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Users.find({'id':id}, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;