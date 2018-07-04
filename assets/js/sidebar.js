'use strict';
(function ($) {

	var innerNavLinks = $('.navigation .navigation-inner a')

	$('.navigation > li > a').click(function (e) {
		$(this).parent().toggleClass('open');
	});

	innerNavLinks.click(function (e) {

		innerNavLinks.removeClass('active');
		$(this).addClass('active');

		$('.navigation a.current').removeClass('current');
		$(this).parent().parent().prev().addClass('current');
		
	});

})(Zepto)
