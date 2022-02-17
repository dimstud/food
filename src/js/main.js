window.addEventListener('DOMContentLoaded', () => {

	// Tabs
	const tabs = document.querySelectorAll('.tabheader__item'),
		  tabsContent = document.querySelectorAll('.tabcontent'),
		  parentSelector = document.querySelector('.tabheader__items');

	const hidenTabsContent = () => {
		tabsContent.forEach(item => {
			item.classList.remove('show', 'fade');
			item.classList.add('hide');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	};

	const showTabsContent = (i = 0) => {
		tabsContent[i].classList.remove('hide');
		tabsContent[i].classList.add('show', 'fade');
		tabs[i].classList.add('tabheader__item_active');
	};

	parentSelector.addEventListener('click', (e) => {
		const target = e.target;
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hidenTabsContent();
					showTabsContent(i);
				}
			});
		}
	});

	hidenTabsContent();
	showTabsContent();

	// Timer

	const deadline = '2022-03-12';

	const getTimeRemaining = (endtime) = {
		const t = Date.parse(endtime) - Date.parse(new Date),
			  days = Math.floor(t - (1000 * 60 * 60 * 24)),
			  hours = Math.random((t / (1000 *  60 * 60) % 24)),
			  minutes = Math.floor((t / 1000 / 60) % 60),
			  minutes = Math.floor((t / 1000) % 60);

		
	};
});