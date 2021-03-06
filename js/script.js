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




	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
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
                        <div class="menu__item-cost">????????:</div>
                        <div class="menu__item-total"><span>${this.price}</span> ??????/????????</div>
                    </div>
	  `;
	  this.parent.append(elem);
	  }
	}
	
	new CardMenu(
	  '???????? "????????????"',
	  "vegy.jpg",
	  `???????? "????????????" - ?????? ?????????? ???????????? ?? ?????????????????????????? ????????: ???????????? ???????????? ???????????? ?? ??????????????. ?????????????? ???????????????? ?? ???????????????? ??????????. ?????? ?????????????????? ?????????? ?????????????? ?? ?????????????????????? ?????????? ?? ?????????????? ??????????????????!`,
	  9,
	  `.menu .container`,
	  'menu__item',
	  'big',
	  ).render();
	  
  new CardMenu (
        '???????? ????????????????????',
        "elite.jpg",
        `?? ???????? ???????????????????? ???? ???????????????????? ???? ???????????? ???????????????? ???????????? ????????????????, ???? ?? ???????????????????????? ???????????????????? ????????. ?????????????? ????????, ????????????????????????, ???????????? - ?????????????????????? ???????? ?????? ???????????? ?? ????????????????!`,
        21,
        `.menu .container`
    ).render();
    
    new CardMenu (
        '???????? "??????????????"',
        "post.jpg",
        `???????? ???????????????????? - ?????? ???????????????????? ???????????? ????????????????????????: ???????????? ???????????????????? ?????????????????? ?????????????????? ??????????????????????????, ???????????? ???? ??????????????, ????????, ???????????? ?????? ????????????, ???????????????????? ???????????????????? ???????????? ???? ???????? ???????? ?? ?????????????????? ???????????????????????????? ??????????????.`,
        11,
        `.menu .container`
    ).render();

	// Form

	const forms = document.querySelectorAll('form'),
	message = {
		loading: 'img/form/spinner.svg',
		succes: '??????????????! ?????????? ???? ?? ???????? ????????????????',
		failure: '??????-???? ?????????? ???? ??????...',
	};

	forms.forEach(item => {
		postData(item);
	});

	function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
			    display: block;
			    margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);
			
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
					showThanksModal(message.succes);
					form.reset();
				  statusMessage.remove();
				} else {
					showThanksModal(message.failure);
				}
			});
		});
	}
	
	function showThanksModal (message) {
		const prevModalDialog = document.querySelector('.modal__dialog');
		prevModalDialog.classList.add('hide');
		openModal();
		const thenksModal = document.createElement('div');
		thenksModal.classList.add('modal__dialog');
		thenksModal.innerHTML = `
	  		<div class="modal__content">
	  			<div class="modal__close" data-close>&times</div>
				<div class="modal__title">${message}</div>
  			</div>
		`;
		document.querySelector('.modal').append(thenksModal);
			setTimeout(() => {
			thenksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}
});

