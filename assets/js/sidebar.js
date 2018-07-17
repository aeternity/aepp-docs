'use strict';
(function ($) {

	var lsKey = 'se-op';

	var innerNavLinks = $('.navigation .navigation-inner a');

	var classOpen = 'open';
	var classCurrent = 'current';

	for (var i = 0; i < innerNavLinks.length; i++) {
		var el = innerNavLinks[i];
		if ($(el).hasClass('active')) {
			$(el).closest('.navigation > li').addClass(classOpen);
			$(el).closest('ul').prev().addClass(classCurrent);
		}
	}

	var sectionsOpen = loadOpenSections(lsKey);

	$.each(sectionsOpen, function (i, e) {
		var el = $('[data-id="' + e + '"]');
		if (el) {
			el.addClass(classOpen);
		}
	});

	$('.navigation > li > a').click(function (ev) {
		$(this).parent().toggleClass(classOpen);
		var newId = $(this).parent().data('id') + '';

		if ($(this).parent().hasClass(classOpen) && sectionsOpen.indexOf(newId) < 0) {
			sectionsOpen.push(newId);
		} else if (!$(this).parent().hasClass(classOpen) && sectionsOpen.indexOf(newId) >= 0) {
			sectionsOpen = sectionsOpen.filter(function (el) {
				return el != newId;
			});
		}
		window.localStorage.setItem(lsKey, sectionsOpen.join(', '));
	});

	function loadOpenSections(key) {
		var storedSections = window.localStorage.getItem(key);

		if (storedSections && document.referrer !== '') {
			return storedSections.split(', ');
		}

		var arr = [];
		var currentlyOpened = $('.navigation li.open');
		if (currentlyOpened.length) {
			$.each(currentlyOpened, function () {
				var id = currentlyOpened.data('id') + '';
				if (id && arr.indexOf(id) < 0) {
					arr.push(id);
				}
			});
		}

		window.localStorage.setItem(key, arr.join(', '));
		return arr;
	}

})(Zepto)