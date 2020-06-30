/* eslint-disable indent */
window.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line strict
  'use strict';

  // Timer
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

    const timerId = setInterval(updateClock, 1000);

    function updateClock() {
      const timer = getTimeRemaining();

      if (timer.timeRemaining < 0) {
        clearInterval(timerId);
        return;
      }

      timerHours.textContent = timerNumber(timer.hours);
      timerMinutes.textContent = timerNumber(timer.minutes);
      timerSeconds.textContent = timerNumber(timer.seconds);
    }
  }

  countTimer('2 july 2020');

});
