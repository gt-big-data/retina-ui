var config = require('./config')('dev'),
  db = require('monk')(config.db('big_data')),
  filter = require('./filter');

module.exports = function(app) {
  
  var articles =  db.get('articles');
  app.get('/latest', function(req, res) {
    articles.find(
      // return the 25 most recent articles
      {"v": "0.0.1"}, 
      {limit:25, sort:{'download_date':1}},
      function (err, docs) {
        if (err) {
          throw err;
        }
        res.send(docs);
    });
  });

  app.get('/categories', function(req, res) {
    var categories = req.param('query').toLowerCase();
    articles.find(
      // return the 25 most recent articles that are in the
      // requested category
      {"v": "0.0.1", 'categories': categories },
      {limit:25, sort:{'download_date':1}},
      function(err, docs) {
        if (err) {
          throw err;
        }
        res.send(docs);
      })
  })

  app.get('/source', function(req, res) {
    var source = req.param('query').toLowerCase();
    articles.find(
      // return the 25 most recent articles from the requested source
      {"v": "0.0.1", 'source_domain': source },
      {limit:25, sort:{'download_date':1}},
      function(err, docs) {
        if (err) {
          throw err;
        }
        res.send(docs);
      })
  })
}