var config = require('./config')('prod'),
    models = require('./models')
    VERSION = config.version,
    ARTICLE_LIMIT = 20;

module.exports = function(app) {

    var articles =  models.Articles;
    app.get('/latest/:size?', function(req, res) {
        var size = parseInt(req.params.size) || ARTICLE_LIMIT;
        articles.find(
            // returns the specified amount of most recent articles
            {'v': VERSION},
            {},
            {
                limit: size,
                sort: {'recent_download_date': -1}
            },
            function(err, docs) {
                if (err) {
                    throw err;
                }
                res.json(docs);
        });
    });

    app.get('/categories/:category/:size?', function(req, res) {
    var category = req.params.category.toLowerCase();
        var size = parseInt(req.params.size) || ARTICLE_LIMIT;
        articles.find(
              //return the specified amount of the most 
              //recent articles that are in the requested category
              {"v": VERSION, 'categories': category },
              null, 
              {
                    limit: size, 
                    sort: {'recent_download_date':-1}
              },
              function(err, docs) {
                    if (err) {
                      throw err;
                    }
                    res.json(docs);
              });
    });

    app.get('/source/:source/:size?', function(req, res) {
        var source = req.params.source.toLowerCase();
        var size = parseInt(req.params.size) || ARTICLE_LIMIT;
        articles.find(
            // return the specified amount of the most 
            //recent articles that from the specified source
            {"v": VERSION, 'source_domain': source },
            {}, 
            {
                limit: size, 
                sort: {'recent_download_date':-1}
            },
            function(err, docs) {
                if (err) {
                  throw err;
                }
                res.json(docs);
        });
    });

    app.get('/article/:id', function(req, res) {
        // Return data for a given id
        var id = req.params.id;
        articles.findOne(
            // return a specific article
            {'v': VERSION, '_id':id},
            {},
            function(err, doc) {
                if (err) {
                  throw err;
                }
                res.json(doc);
          });
    });

    app.get('/categories/', function(req, res) {
        // Return the categories of the  most recent articles
        articles.find(
            {'v':VERSION, 'categories':{$ne: null}}, 
            'categories',
            {
                limit: ARTICLE_LIMIT,
                sort: {'recent_download_date':-1} 
            },
            function(err, docs) {
            res.json(docs);
        });
    });

    app.get('/keywords/', function(req, res) {
        // Return the keywords of the most recent articles
        articles.find(
            {'v':VERSION, 'keywords':{$ne: null}}, 
            'keywords',
            {
                limit: ARTICLE_LIMIT,
                sort: {'recent_download_date':-1} 
            },
            function(err, docs) {
            res.json(docs);
        });
    });
}
