function niceDate(d) {
	var months = ['January','February','March','April','May','June', 'July','August','September','October','November','December'];
	var day = d.getDate();
	dayVis1.html(d.getFullYear());
	dayVis2.html(months[d.getMonth()]+' '+day+nth(day));
}

function nth(d) {
	if(d>3 && d<21) return 'th';
	switch (d % 10) {
		case 1:  return "st";
		case 2:  return "nd";
		case 3:  return "rd";
		default: return "th";
	}
}
function buildFullDate(d) {
	return d.getFullYear()+'-'+(((d.getMonth()+1)<10)?'0':'')+(d.getMonth()+1)+'-'+((d.getDate()<10)?'0':'')+d.getDate();
}
function buildSmallDate(d) {
	return (((d.getMonth()+1)<10)?'0':'')+(d.getMonth()+1)+'/'+((d.getDate()<10)?'0':'')+d.getDate();
}