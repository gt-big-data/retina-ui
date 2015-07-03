module.exports = config();

function config() {

    var version = "0.0.7";
    
    var dev = {};
    dev.version = version;
    dev.db = function(name) {
        return 'mongodb://146.148.59.202:27017/' + name;
    };

    dev.facebook = {
        clientID: 566737753454309,
        clientSecret: "eba56ecd3a902b791cb8ba258f72a501",
        callbackURL: "http://localhost:5000/users"
    };

    dev.google = {
        clientID: null,
        clientSecret: null,
        realm: "http://localhost:5000/",
        callbackURL: "http://localhost:5000/users/auth/google/callback"
    };

    
    var prod = {};
    prod.version = version;
    prod.db = function(name) {
        return 'mongodb://146.148.59.202:27017/' + name;
    };
    prod.facebook = {
        clientID: 545078782286873,
        clientSecret: "c8a9f573cd188ef8f55842bcda995614",
        callbackURL: "http://retinanews.net/users",
    };
    prod.google = {
        clientID: null,
        clientSecret: null,
        realm: 'http://retinanews.net/',
        callbackURL: "http://retina-news.net/users/auth/google/"
    };

    if (process.env.NODE_ENV === 'prod') {
        return prod;
    } else {
        return dev;
    }
}
