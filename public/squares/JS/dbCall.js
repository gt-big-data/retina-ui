function getLatestArticles(callback) {
	// for now this page gets some kind of JSON object contained the newest article of each cluster
	$.get('/api/categories/recent', function(payload) {
        callback(payload.Error, payload.Data);
    });
}