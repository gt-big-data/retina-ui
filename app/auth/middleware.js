exports.loggedIn = function(req, res, next) {
    if (req.uid) {
        return next();
    }
    res.redirect('/notloggedin');
}