"use strict"
var userModel = require('./schemas').userModel;

///////////////////

function getUserInfo(req, res) {
    userModel.getUserInfo(req.cookies.retinaID)
    .then(function(doc) {
        res.json(doc);
    }, function(err) {
        res.status(403).send('Permission Denied');
    });
}

function recordView(req, res) {
    userModel.recordView(req.cookies.retinaID, req.param('article'),
        function(err, docs) {
            res.json(docs);
        });
}

module.exports = function(app) {
    app.get('/users/user', getUserInfo);
};

