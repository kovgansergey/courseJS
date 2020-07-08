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

  // слайдер
  function slider() {
    const slider = document.querySelector('.portfolio-content');
    const slide = slider.querySelectorAll('.portfolio-item');
    const portfolioDots = slider.querySelector('.portfolio-dots');

    let currentSlide = 0;
    let interval;

    function getDots() {
      for (let i = 0; i < slide.length; i++) {
        portfolioDots.insertAdjacentHTML('beforeend', '<li class="dot"></li>');
      }
    }

    getDots();

    const dot = slider.querySelectorAll('.dot');
    dot[0].classList.add('dot-active');

    function prevSlide(elem, index, strClass) {
      elem[index].classList.remove(strClass);
    }

    function nextSlide(elem, index, strClass) {
      elem[index].classList.add(strClass);
    }

    function autoPlaySlide() {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    }

    function startSlide(time = 2000) {
      interval = setInterval(autoPlaySlide, time);
    }

    function stopSlide() {
      clearInterval(interval);
    }

    slider.addEventListener('click', event => {
      event.preventDefault();
      const target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((item, i) => {
          if (item === target) {
            currentSlide = i;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', event => {
      if (event.target.matches('.portfolio-btn, .dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', event => {
      if (event.target.matches('.portfolio-btn, .dot')) {
        startSlide();
      }
    });

    startSlide(2000);
  }

  slider();

  // калькулятор
  function calculator(price = 100) {
    const calcBlock = document.querySelector('.calc-block');
    const calcType = calcBlock.querySelector('.calc-type');
    const calccSquare = calcBlock.querySelector('.calc-square');
    const calcCount = calcBlock.querySelector('.calc-count');
    const calcDay = calcBlock.querySelector('.calc-day');
    const totalValue = calcBlock.querySelector('#total');

    calcBlock.addEventListener('input', event => {
      const target = event.target;

      if (target.tagName === 'INPUT') {
        target.value = target.value.replace(/\D/, '');
      }
    });

    const totalAnimate = item => {
      let coin = 0;

      requestAnimationFrame(function totalAnim() {
        totalValue.textContent = coin;

        if (coin < item) {
          coin += Math.floor(item / 100);
          requestAnimationFrame(totalAnim);
        } else {
          totalValue.textContent = item;
        }
      });
    };

    const countSum = () => {
      let total = 0;
      let countValue = 1;
      let dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value;
      const squareValue = +calccSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      totalAnimate(Math.floor(total));
    };

    calcBlock.addEventListener('change', event => {
      const target = event.target;

      if (target.matches('.calc-item')) {
        countSum();
      }
    });
  }

  calculator(100);

  // команда
  function command() {
    const command = document.getElementById('command');

    const changePhoto = item => {
      [item.src, item.dataset.img] = [item.dataset.img, item.src];
    };

    command.addEventListener('mouseover', event => {
      const target = event.target;

      if (target.tagName === 'IMG') {
        changePhoto(target);
      }
    });

    command.addEventListener('mouseout', event => {
      const target = event.target;

      if (target.tagName === 'IMG') {
        changePhoto(target);
      }
    });
  }

  command();

});
