'use strict';

import popupToggle from './modules/popupToggle';


document.addEventListener('click', event => {
  const target = event.target;

  // модальное окно popup-call при клике на "перезвоните мне" в header и footer
  if (target.classList.contains('call-btn')) {
    event.preventDefault();
    popupToggle('.popup-call');
  }
});
