mongoose = require('mongoose');

var LocalUserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    categories: { type: Array, "default":[] },
});
var LocalUser = mongoose.model('LocalUser', LocalUserSchema);

var FbUserSchema = mongoose.Schema({
    fbId: String,
    email: String,
    name: String,
    categories: { type: Array, "default":[] },

});
var FbUsers = mongoose.model('FbUsers', FbUserSchema);

exports.LocalUser = LocalUser;
exports.FbUsers = FbUsers;