window.addEventListener('DOMContentLoaded', () => {

	// Tabs
	const tabs = document.querySelectorAll('.tabheader__item'),
		  tabsContent = document.querySelectorAll('.tabcontent'),
		  parentSelector = document.querySelector('.tabheader__items');

	function hidenTabsContent() {
		tabsContent.forEach(item => {
			item.classList.remove('show', 'fade');
			item.classList.add('hide');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	};

	function showTabsContent(i = 0) {
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

	const deadline = '2022-03-01T00:22';

	function getTimeRemaining(endtime){
		const t = Date.parse(endtime) - Date.parse(new Date()),
			  days = Math.floor(t / (1000 * 60 * 60 * 24)),
			  hours = Math.floor((t / (1000 *  60 * 60) % 24)),
			  minutes = Math.floor((t / 1000 / 60) % 60),
			  seconds = Math.floor((t / 1000) % 60);

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds,
		}
	}

	function setZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			  days = timer.querySelector('#days'),
			  hours = timer.querySelector('#hours'),
			  minutes = timer.querySelector('#minutes'),
			  seconds = timer.querySelector('#seconds'),
			  timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = setZero(t.days);
			hours.innerHTML = setZero(t.hours);
			minutes.innerHTML = setZero(t.minutes);
			seconds.innerHTML = setZero(t.seconds);

			if (t.total <= 0) {
				clearTimeout(timeInterval);
			}
		}
	}

	setClock('.timer', deadline);

	// Modal

	const modal = document.querySelector('.modal'),
		  modalTrigger = document.querySelectorAll('[data-modal]'),
		  modalCloseBtn = document.querySelector('[data-close]');

	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
		}

		window.removeEventListener('scroll', showModalByScroll);
	}

	modalTrigger.forEach(btns =>{
		btns.addEventListener('click', openModal);
	});

	const modalTimerId = setTimeout(openModal, 3000);

	window.addEventListener('scroll', showModalByScroll);



	modalCloseBtn.addEventListener('click', closeModal);

	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});
});
