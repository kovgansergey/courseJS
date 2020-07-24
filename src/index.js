'use strict';

import popupToggle from './modules/popupToggle';
import maskPhone from './modules/maskPhone';
import sendForm from './modules/sendForm';
import panelGroup from './modules/panelGroup';


document.addEventListener('click', event => {
  const target = event.target;

  // модальное окно popup-call при клике на "перезвоните мне" в header и footer
  if (target.classList.contains('call-btn')) {
    event.preventDefault();
    popupToggle('.popup-call');
  }

  // модальное окно popup-discount со скидкой
  if (target.classList.contains('discount-btn')) {
    popupToggle('.popup-discount');
  }

  // аккордеон
  if (target.closest('.panel-group')) {
    panelGroup(target);
  }
});

// маска телефона
maskPhone('.phone-user', '+7(___)___-__-__');

// отправка форм
sendForm('form1');
sendForm('form2');