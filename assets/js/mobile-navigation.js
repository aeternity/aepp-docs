'use strict';
(function ($) {

	var menuRight = $('#cbp-spmenu-s2');
	var openMenuButton = $('#open-menu');
	var closeMenuButton = $('#close-menu');
	var body = $('body');

	var openSearchMenuButton = $('#search-open');
	var closeSearchMenuButton = $('#search-close');
	var sidebar = $('#sidebar');
	var mainContent = $('main.content');

	openMenuButton.add(closeMenuButton).click(toggleMenu);
	openSearchMenuButton.add(closeSearchMenuButton).click(function (e) {
		e.stopPropagation();
		toggleSearchMenu();
	});


	function toggleMenu() {
		body.toggleClass('cbp-spmenu-push-toleft');
		menuRight.toggleClass('cbp-spmenu-open');
	}

	function toggleSearchMenu() {
		sidebar.toggleClass('open');

		mainContent.css('min-height', 'initial');
		if (sidebar.hasClass('open')) {
			if (mainContent.height() < sidebar.height()) {
				mainContent.css('min-height', sidebar.height() + 50);
			}
		}
	}

	$(document).click(function (e) {

		if (sidebar.hasClass('open')) {
			var target = $(e.target);
			let parents = target.parents();

			if (!target.is('#sidebar')
				&& parents.indexOf(document.getElementById('sidebar')) < 0) {
				sidebar.removeClass('open');
			}
		}
	});

})(Zepto)
