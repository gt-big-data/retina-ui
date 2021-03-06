var screenW, screenH;
var tileW = 370, tileH = 200;
var rows, cols;
var config = [];
var loadInterval;
var categories = ['Politics', 'Sports', 'Technology', 'Arts', 'Justice', 'Travel', 'Dining', 'Health', 'Business', 'World', 'Theater', 'Science', 'US', 'Movies', 'Opinion'];
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
		config[0] = {width: 1, height: 1, category: 'Politics'};
		config[1] = {width: 1, height: 1, category: 'World'};
		config[2] = {width: 1, height: 1, category: 'Technology'};
		saveConfig();
	}
	else {
		config = []; bug = false;
		var strConfig = $.cookie('squareConfig').split('[]');
		for (var i = 0; i < strConfig.length; i++) {
			conf = strConfig[i].split('|');
			if(conf.length >= 3) {
				config.push({width: +conf[0], height: +conf[1], category: conf[2]});
			}
			else {
				bug = true;
			}
		}
		if(bug == true) { // format was incorrect... redoing it
			$.removeCookie('squareConfig');	loadConfig();	
		}
	}
}
function saveConfig() {
	var buildStr = []; 
	for (var i = 0; i < config.length; i++) {
		conf = config[i];
		buildStr.push(conf.width+'|'+conf.height+'|'+conf.category);
	}
	$.cookie('squareConfig', buildStr.join('[]'));
}
function buildUI() {
	for (var i = 0; i < config.length; i++) {
		conf = config[i];
		var newTile = '<div id="tile'+i+'" class="tile" style="width: '+(tileW*conf.width)+'px; height: '+(tileH*conf.height)+'px;">';
		newTile += '<div class="tileBack">&nbsp;</div>';
		newTile += '<div class="bottomGradient">&nbsp;</div>';
		newTile += '<div class="tileTitle">'+conf.category+'</div>';
		newTile += '<img class="tileCat" src="images/categoryIcons/'+conf.category.toLowerCase()+'.png" alt="'+conf.category+'" title="'+conf.category+'" />';
		newTile += '</div>';
		$('#content').append(newTile);
	}
	if(rows*cols > config.length) {
		openNewTile();
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
function openNewTile() {
	newTile = '<div id="newTile" style="width: '+tileW+'px; height: '+tileH+'px;" onclick="showSelect();">Add a new category</div>';
	$('#content').append(newTile);
}
function showSelect() {
	var newText = '<select id="chosenCat" onchange="addNewTile(this.value);" onclick="event.stopPropagation();">';
	for (var i = 0; i < categories.length; i++) {
		notGood = false;
		for (var j = 0; j < config.length; j++) if (config[j].category == categories[i]) notGood = true;
		if(!notGood) newText += '<option value='+categories[i]+'>'+categories[i]+'</option>';
	}
	newText += '</select>';
	$('#newTile').html(newText);
}
function addNewTile(cat) {
	config.push({width: 1, height: 1, category: cat});
	saveConfig();
	window.location.reload();
}
initialize();