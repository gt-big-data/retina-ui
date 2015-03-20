var screenW, screenH;
var tileW = 300, tileH = 170;
var rows, cols;
var config = [];
var loadInterval;
function initialize() {
	screenW = $(document).width();
	screenH = $(document).height();
	rows = Math.floor(screenH/tileH);
	cols = Math.floor(screenW/tileW);
	loadConfig(); // load the user's config
	buildUI();
	reloadInput();
	loadInterval = setInterval(function() {reloadInput();}, 5000);
}
function loadConfig() {
	config[0] = {width: 1, height: 1, r: 0, c: 0, category: 'Politics'};
	config[1] = {width: 1, height: 1, r: 1, c: 0, category: 'World'};
	config[2] = {width: 1, height: 1, r: 0, c: 1, category: 'Technology'};
}
function buildUI() {
	for (var i = 0; i < config.length; i++) {
		conf = config[i];
		var newTile = '<div id="tile'+i+'" class="tile" style="top: '+(conf.r*tileH)+'px; left: '+(conf.c*tileW)+'px; width: '+(tileW*conf.width)+'px; height: '+(tileH*conf.height)+'px;">';
		newTile += '<div class="tileBack">&nbsp;</div>';
		newTile += '<div class="tileTitle">'+conf.category+'</div>';
		newTile += '</div>';
		$('#content').append(newTile);
	}
}
function reloadInput() {
	console.log('Reloaded');
	var articles = getLatestArticles(); // this function is in dbCall.js
	for (var i = 0; i < config.length; i++) {
		conf = config[i];
		for (var j = 0; j < articles.length; j++) {
			if(articles[j].category == conf.category) {
				reloadTile(i, articles[j]);
			}
		}
	}
}
function reloadTile(index, article) {
	$('#tile'+index+' .tileTitle').html(article.title);
	$('#tile'+index+' .tileBack').css({"background-image": "url("+article.img+")"});

}
initialize();