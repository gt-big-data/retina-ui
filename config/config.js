module.exports = function(env) {
  this.version = "0.0.6";
  this.dev = {
    version: this.version ,
    db: function(name) {
      return 'mongodb://localhost/' + name;
    },
    facebook: {
    clientID:566737753454309,
    clientSecret:"eba56ecd3a902b791cb8ba258f72a501",
    callbackURL:"http://localhost:5000/users",
      },
    google: {
      clientID: null,
      clientSecret: null,
      realm:"http://localhost:5000/", 
      callbackURL:"http://localhost:5000/users/auth/google/callback"
    }
  }
  this.prod = {
    version: this.version,
    db: function(name){
      return 'mongodb://146.148.59.202:27017/' + name;
    },
    facebook: {
      clientID:545078782286873,
      clientSecret:"c8a9f573cd188ef8f55842bcda995614",
      callbackURL:"http://retinanews.net/auth/facebook/callback",
    },
    google: {
      clientID: null,
      clientSecret: null, 
      realm: 'http://retinanews.net/',
      callbackURL:"http://retina-news.net/users/auth/google/callback"
    }
  }
  return this[env];
}
