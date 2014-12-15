var mongoose = require('mongoose');

var BaseUserSchema = mongoose.Schema({
    id: String,
    email: String,
    name: String,
    photo: String,
    categories: { type: Array, "default":[] },
    keywords: { type: Array, "default":[] },
    sources: { type: Array, "default":[] },
    articles = { type: Array, "default":[] },
});

var BaseUser = mongoose.model('FbUsers', BaseUserSchema);
exports.user = FbUsers;