module.exports = function(feed) {
  return feed.map(function(article) {
    if(typeof article.summary === 'string'){var articleSummary = article.summary.replace(/<(?:.|\n)*?>/gm, '')}
    else{var articleSummary = article.summary}
    return {
      title: article.title,
      date: article.recent_pub_date.toDateString(),
      description: articleSummary,
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
