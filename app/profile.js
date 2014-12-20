var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config/config')('dev');
var db = mongoose.createConnection(config.db('big_data'));
var userSchema = require('./models/users.js').userSchema;
var users =  db.model('users', userSchema);

exports.updatePreferences = function(req, res) {
    var keywords = JSON.parse(req.param('keywords')); 
    var categories = JSON.parse(req.param('categories'));
    console.log(categories);
    users.update(
        {'uid': req.cookies.uid},
        {
            $push: {'keywords': { $each: keywords},
                    'categories': { $each: categories},
                },
        },
        {},
        function(err, doc) {
            console.log(doc);
            res.json(doc);
        }
    );
}

exports.saveArticle = function(req, res ) {
    var article = JSON.parse(req.param('article'));
    users.findOneAndUpdate(
        {'uid': pref.uid},
        {
            $push: {'articles': article},
        },
        {},
        function(err, doc) {
            res.json(doc);
        }
    );
}