var config = require('./config')('prod'),
  db = require('monk')(config.db('big_data')),
  filter = require('./filter'),
  VERSION = "0.0.5",
  ARTICLE_LIMIT = 10;


module.exports = function(app) {
  
  var articles =  db.get('articles');
  app.get('/latest', function(req, res) {
    articles.find(
      // return the 25 most recent articles
      {"v": VERSION}, 
      {limit:ARTICLE_LIMIT, sort:{'download_date':-1}},
      function (err, docs) {
        if (err) {
          throw err;
        }
        res.send(filter(docs));
    });
  });

  app.get('/categories', function(req, res) {
    var categories = req.param('query').toLowerCase();
    articles.find(
      // return the 25 most recent articles that are in the
      // requested category
      {"v": VERSION, 'categories': categories },
      {limit:ARTICLE_LIMIT, sort:{'download_date':-1}},
      function(err, docs) {
        if (err) {
          throw err;
        }
        res.send(filter(docs));
      })
  })

  app.get('/source', function(req, res) {
    var source = req.param('query').toLowerCase();
    articles.find(
      // return the 25 most recent articles from the requested source
      {"v": VERSION, 'source_domain': source },
      {limit:ARTICLE_LIMIT, sort:{'download_date':-1}},
      function(err, docs) {
        if (err) {
          throw err;
        }
        res.send(filter(docs));
      })
  })
}