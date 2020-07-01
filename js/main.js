/* eslint-disable indent */
window.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line strict
  'use strict';

  // Таймер
  function countTimer(deadline) {
    const timerHours = document.querySelector('#timer-hours');
    const timerMinutes = document.querySelector('#timer-minutes');
    const timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      const dateStop = new Date(deadline).getTime();
      const dateNow = new Date().getTime();
      const timeRemaining = (dateStop - dateNow) / 1000;
      const seconds = Math.floor(timeRemaining % 60);
      const minutes = Math.floor((timeRemaining / 60) % 60);
      const hours = Math.floor(timeRemaining / 3600);
      return { timeRemaining, hours, minutes, seconds };
    }

    function timerNumber(n) {
      if (n <= 9) {
        return '0' + n;
      } else {
        return n;
      }
    }

    const timerId = setInterval(() => {
      const timer = getTimeRemaining();

      if (timer.timeRemaining < 0) {
        clearInterval(timerId);
        return;
      }

      timerHours.textContent = timerNumber(timer.hours);
      timerMinutes.textContent = timerNumber(timer.minutes);
      timerSeconds.textContent = timerNumber(timer.seconds);
    }, 1000);

  }

  countTimer('2 july 2020');

  // меню
  function toggleMenu() {
    const menuBtn = document.querySelector('.menu');
    const menu = document.querySelector('menu');
    const menuCloseBtn = menu.querySelector('.close-btn');
    const menuItems = menu.querySelectorAll('ul>li>a');
    const mainLink = document.querySelector('main>a');

    function handlerMenu() {
      menu.classList.toggle('active-menu');
    }

    function scrollLink(item) {

      const blockId = item.getAttribute('href').substr(1);

      document.getElementById(blockId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    menuBtn.addEventListener('click', handlerMenu);
    menuCloseBtn.addEventListener('click', handlerMenu);
    menuItems.forEach(item => item.addEventListener('click', () => {
      handlerMenu();
      event.preventDefault();
      scrollLink(event.target);
    }));
    mainLink.addEventListener('click', () => {
      event.preventDefault();
      scrollLink(event.target.parentNode);
    });
  }

  toggleMenu();

  // модальное окно
  function togglePopup() {
    const popup = document.querySelector('.popup');
    const popupBtn = document.querySelectorAll('.popup-btn');
    const popupCloseBtn = popup.querySelector('.popup-close');

    function popupAnimate() {
      let opacity = 0;
      requestAnimationFrame(function popupAnim() {
        popup.style.opacity = `${opacity}%`;

        if (opacity <= 100) {
          opacity++;
          requestAnimationFrame(popupAnim);
        }
      });
    }

    popupBtn.forEach(item => item.addEventListener('click', () => {
      popup.style.display = 'block';
      if (window.innerWidth >= 768) {
        popupAnimate();
      }
    }));

    popupCloseBtn.addEventListener('click', () => {
      popup.style.display = '';
    });
  }

  togglePopup();

});
