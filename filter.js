module.exports = function(feed, size) {
  return feed.map(function(article) {
    return {
      title: article.title,
      description: article.meta_description,
      img: article.meta_img,
      text: article.text,
      url: article.url,
      source: article.meta_data.og.site_name,
      show:false,
    };
  }).slice(0,size);
}