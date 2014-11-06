module.exports = function(feed) {
  return feed.map(function(article) {
    return {
      title: article.title,
      date: article.recent_pub_date.toDateString(),
      description: article.summary,
      img: article.images,
      text: article.text,
      categories: article.categories,
      url: article.url,
      source: article.source_domain,
      favicon: article.meta_favicon,
      show:false,
    };
  });
}
