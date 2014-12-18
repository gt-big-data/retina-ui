var mongoose = require('mongoose');

exports.userSchema = mongoose.Schema({
    uid: String,
    name: String,
    categories: { type: Array, "default":[] },
    keywords: { type: Array, "default":[] },
    articles : { type: Array, "default":[] },
});