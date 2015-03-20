function getLatestArticles(callback) {
	$.get('/api/categories/recent', function(payload) {
        callback(payload.Error, payload.Data);
    });
}