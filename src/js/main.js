window.addEventListener('DOMContentLoaded', () => {

	const tabs = document.querySelectorAll('.tabheader__item'),
		  tabsContent = document.querySelectorAll('.tabcontent'),
		  tabsParent = document.querySelector('.tabheader');

	function hideTabsContent() {
		tabsContent.forEach(item => {
			item.classList.remove('show');
			item.classList.add('hide');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabsContent(i = 0) {
		tabsContent[i].classList.remove('hide');
		tabsContent[i].classList.add('show');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabsContent();
	showTabsContent();
});