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
    const menu = document.querySelector('menu');

    // функция плавного скролла ссылок меню
    function scrollLink(item) {

      const blockId = item.getAttribute('href').substr(1);

      document.getElementById(blockId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // одно событие на весь документ
    document.addEventListener('click', event => {
      let target = event.target;

      // если меню активировано - закрытие при клике мимо меню
      if (menu.classList.contains('active-menu') && !target.closest('menu')) {
        menu.classList.remove('active-menu');
      }

      // открытие меню при клике на кнопку меню
      if (target.closest('.menu')) {
        menu.classList.add('active-menu');
      }

      // закрытие меню и скролл ссылок в меню и на главной секции
      if (target.closest('main') || target.closest('menu')) {
        target = target.closest('a');

        if (target) {
          event.preventDefault();
          menu.classList.remove('active-menu');

          if (!target.classList.contains('close-btn')) {
            scrollLink(target);
          }
        }
      }
    });
  }

  toggleMenu();

  // модальное окно
  function togglePopup() {
    const popup = document.querySelector('.popup');
    const popupBtn = document.querySelectorAll('.popup-btn');

    function popupAnimate() {
      let opacity = 0;
      requestAnimationFrame(function popupAnim() {
        popup.style.opacity = `${opacity}%`;

        if (opacity <= 100) {
          opacity += 3;
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

    popup.addEventListener('click', event => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popup.style.display = '';
      } else {
        target = target.closest('.popup-content');

        if (!target) {
          popup.style.display = '';
        }
      }
    });
  }

  togglePopup();

  // табы
  function tabs() {
    const tabHeader = document.querySelector('.service-header');
    const tab = tabHeader.querySelectorAll('.service-header-tab');
    const tabContent = document.querySelectorAll('.service-tab');

    function toggleTabContent(index) {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    }

    tabHeader.addEventListener('click', event => {
      const target = event.target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  }

  tabs();

});
