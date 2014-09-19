module.exports = function(feed, size) {
  var stories = [];
  for (var i = 0; i < size && i < feed.length; i++) {
    var article = feed[i];
    var data = {
      "title": article.title,
      "description": article.meta_description,
      "img": article.meta_img,
      "text": article.text,
      "url": article.url,
      "source": article.meta_data.og.site_name,
      "show":false,
    };
    stories.push(data);
  }
  return stories;
}