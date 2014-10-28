module.exports = function(feed) {
  return feed.map(function(article) {
    return {
      title: article.title,
      date: new Date(article.download_date * 1000).toDateString(),
      description: article.summary,
      img: article.images,
      text: article.text,
      categories: article.categories,
      url: article.url,
      source: article.source_domain,
      show:false,
    };
  });
}
