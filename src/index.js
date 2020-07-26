'use strict';

import maskPhone from './modules/maskPhone';
import sendForm from './modules/sendForm';
import popupToggle from './modules/popupToggle';
import panelGroup from './modules/panelGroup';
import constructor from './modules/constructor';
import moreBlocks from './modules/moreBlocks';


// маска телефона
maskPhone('.phone-user', '+7(___)___-__-__');

// отправка форм
sendForm('form1');
sendForm('form2');

// калькулятор в первом аккордеоне
constructor();

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

  // модальное окно popup-discount с данными аккордеона №1
  if (target.classList.contains('calc-btn')) {
    popupToggle('.popup-discount', constructor('getData'));
  }

  // модальное окно popup-check при клике на Получить чек-лист
  if (target.classList.contains('check-btn')) {
    popupToggle('.popup-check');
  }

  // оба аккордеона
  if (target.closest('.panel-group')) {
    panelGroup(target);
  }

  // кнопка Больше
  if (target.classList.contains('add-sentence-btn')) {
    moreBlocks(target);
  }
});