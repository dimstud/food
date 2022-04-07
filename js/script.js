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
	
	//class
	
	class CardMenu{
	  constructor(title, img, descr, price, parentSelector, ...classes){
	  this.title = title;
	  this.img = img;
	  this.descr = descr;
	  this.price = price;
	  this.parent = document.querySelector(parentSelector);
	  this.classes = classes,
	  this.transfer = 29;
	  this.changeRoUAH();
	  }
	  
	  changeRoUAH () {
	    this.price = this.price * this.transfer;
	  }
	  
	  render () {
	    const elem = document.createElement('div');
	    
	    if(this.classes.length === 0) {
	      this.elem = 'menu__item';
	      elem.classList.add(this.elem);
	    } else {
	      this.classes.forEach(className => elem.classList.add(className));
	    }
	    
	    elem.innerHTML = `
                    <img src="img/tabs/${this.img}" alt=${this.title}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
	  `;
	  this.parent.append(elem);
	  }
	}
	
	new CardMenu(
	  'Меню "Фитнес"',
	  "vegy.jpg",
	  `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
	  9,
	  `.menu .container`,
	  'menu__item',
	  'big',
	  ).render();
	  
  new CardMenu (
        'Меню “Премиум”',
        "elite.jpg",
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
        21,
        `.menu .container`
    ).render();
    
    new CardMenu (
        'Меню "Постное"',
        "post.jpg",
        `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
        11,
        `.menu .container`
    ).render();

	// Form

	const forms = document.querySelectorAll('form'),
	message = {
		loading: 'Загрузка',
		succes: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...',
	};

	forms.forEach(item => {
		postData(item);
	});

	function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			statusMessage.textContent = message.loading;
			form.append(statusMessage);
			
			const request = new XMLHttpRequest();

			request.open('POST', 'server.php');
			request.setRequestHeader('Content-type', 'application/json');
			const formData = new FormData(form);

			const object = {};

			formData.forEach((value, key) => {
				object[key] = value;
			});

			const json = JSON.stringify(object);

			request.send(json);

			request.addEventListener('load', () => {
				if(request.status === 200) {
					console.log(request.response);
					statusMessage.textContent = message.succes;
					form.reset();
					setTimeout(() => {
						statusMessage.remove();
					}, 2000);
				} else {
					statusMessage.textContent = message.failure;
				}
			});
		});
	}
});

