/* ----------------------------------
jQuery Timelinr 0.9.54
tested with jQuery v1.6+

Copyright 2011, CSSLab.cl
Free under the MIT license.
http://www.opensource.org/licenses/mit-license.php

instructions: http://www.csslab.cl/2011/08/18/jquery-timelinr/
Cut down by Philippe Laban
---------------------------------- */

jQuery.fn.timelinr = function(options){
	settings = jQuery.extend({
		orientation: 				'horizontal',		// value: horizontal | vertical, default to horizontal
		containerDiv: 				'#timeline',		// value: any HTML tag or #id, default to #timeline
		datesDiv: 					'#dates',			// value: any HTML tag or #id, default to #dates
		datesSelectedClass: 		'selected',			// value: any class, default to selected
		datesSpeed: 				'normal',			// value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to normal
		prevButton: 				'#prev',			// value: any HTML tag or #id, default to #prev
		nextButton: 				'#next',			// value: any HTML tag or #id, default to #next
		arrowKeys: 					'true',		     	// value: true | false, default to false
		startAt: 					1					// value: integer, default to 1 (first)
	}, options);

	$(function(){
		// setting variables... many of them
		var currentIndex;
		var howManyDates = $(settings.datesDiv+' li').length;
		var currentDate = $(settings.datesDiv).find('a.'+settings.datesSelectedClass);
		var widthContainer = $(settings.containerDiv).width();
		var heightContainer = $(settings.containerDiv).height();
		var widthDate = $(settings.datesDiv+' li').width();
		var heightDate = $(settings.datesDiv+' li').height();
		// set positions!
		if(settings.orientation == 'horizontal') {	
			$(settings.datesDiv).width(widthDate*howManyDates).css('marginLeft',widthContainer/2-widthDate/2);
			var defaultPositionDates = parseInt($(settings.datesDiv).css('marginLeft').substring(0,$(settings.datesDiv).css('marginLeft').indexOf('px')));
		}
		$(settings.datesDiv+' a').click(function(event){
			event.preventDefault();
			var whichIssue = $(this).attr('alt');
			changeDay(parseInt(whichIssue));
			currentIndex = $(this).parent().prevAll().length;
			// now moving the dates
			$(settings.datesDiv+' a').removeClass(settings.datesSelectedClass);
			$(this).addClass(settings.datesSelectedClass);
			$(settings.datesDiv).animate({'marginLeft':defaultPositionDates-(widthDate*currentIndex)},{queue:false, duration:'settings.datesSpeed'});
		});

		if(settings.arrowKeys=='true') {
			$(document).keydown(function(event){
				if(event.keyCode == 39) {
					if(currentDate.parent().is('li:last-child')) {
						$(settings.datesDiv+' li:first-child').find('a').trigger('click');
					} else {
						currentDate.parent().next().find('a').trigger('click');
					}
				} else if(event.keyCode == 37) {
					if(currentDate.parent().is('li:first-child')) {
						$(settings.datesDiv+' li:last-child').find('a').trigger('click');
					} else {
						currentDate.parent().prev().find('a').trigger('click');
					}
				}
			});
		}
		$(settings.datesDiv+' li').eq(settings.startAt-1).find('a').trigger('click');
	});
};