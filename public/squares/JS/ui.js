var screenW, screenH;
var tileW = 300, tileH = 170;
var rows, cols;
var config = [];
var fillPattern = [];
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
	if(!$.cookie('squareConfig')) {
		config[0] = {width: 1, height: 1, r: 0, c: 0, category: 'Politics'};
		config[1] = {width: 1, height: 1, r: 1, c: 0, category: 'World'};
		config[2] = {width: 1, height: 1, r: 0, c: 1, category: 'Technology'};
		saveConfig(); checkFill();
	}
	else {
		config = []; bug = false;
		var strConfig = $.cookie('squareConfig').split('[]');
		for (var i = 0; i < strConfig.length; i++) {
			conf = strConfig[i].split('|');
			if(conf.length >= 5) {
				config.push({width: +conf[0], height: +conf[1], r: +conf[2], c: +conf[3], category: conf[4]});
			}
			else {
				bug = true;
			}
		}
		if(bug == true) { // format was incorrect... redoing it
			$.removeCookie('squareConfig');	loadConfig();	
		} else checkFill();
	}
}
function saveConfig() {
	var buildStr = []; 
	for (var i = 0; i < config.length; i++) {
		conf = config[i];
		buildStr.push(conf.width+'|'+conf.height+'|'+conf.r+'|'+conf.c+'|'+conf.category);
	}
	$.cookie('squareConfig', buildStr.join('[]'));
}
function buildUI() {
	for (var i = 0; i < config.length; i++) {
		conf = config[i];
		var newTile = '<div id="tile'+i+'" class="tile" style="top: '+(conf.r*tileH)+'px; left: '+(conf.c*tileW)+'px; width: '+(tileW*conf.width)+'px; height: '+(tileH*conf.height)+'px;">';
		newTile += '<div class="tileBack">&nbsp;</div>';
		newTile += '<div class="bottomGradient">&nbsp;</div>';
		newTile += '<div class="tileTitle">'+conf.category+'</div>';
		newTile += '<img class="tileCat" src="images/categoryIcons/'+conf.category.toLowerCase()+'.png" alt="'+conf.category+'" title="'+conf.category+'" />';
		newTile += '</div>';
		$('#content').append(newTile);
	}
}
function reloadInput() {
	getLatestArticles(function(err, articles) {
		for (var i = 0; i < config.length; i++) {
			conf = config[i];
			for (var j = 0; j < articles.length; j++) {
				if(articles[j].category == conf.category) {
					reloadTile(i, articles[j]);
				}
			}
		}
	});
}
function reloadTile(index, article) {
	$('#tile'+index+' .tileTitle').html(article.title);
	$('#tile'+index+' .tileBack').css({"background-image": "url("+article.img+")"});

}
function checkFill() {
	resetFill();
	for (var i = 0; i < config.length; i++) {
		conf = config[i];
		for (var w = 0;  w< conf.width; w++) {
			for (var h = 0;  h < conf.height; h++) fillPattern[(w+conf.r)][(h+conf.c)] = 1;
		}
	}
	console.log(fillPattern);
}
function resetFill() {
	fillPattern = [];
	for (var i = 0; i < rows; i++) {
	fillPattern[i] = [];
	for (var j = 0; j < cols; j++) fillPattern[i][j] = 0;
	}
}
initialize();