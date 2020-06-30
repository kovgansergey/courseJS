'use strict';

const textBlock = document.createElement('div');
document.body.prepend(textBlock);

function getDate() {
  const now = new Date();
  const nowWeekDay = now.toLocaleString('ru', {weekday: 'long'});
  const nowTime = now.toLocaleTimeString('en');
  const newYear = new Date(now.getFullYear(), 11, 32).getTime();
  const newYearTimer = Math.floor((newYear - now.getTime()) / 86400000);

  function getDayPart() {
    if (now.getHours() >= 0 && now.getHours() < 6) {
      return 'Доброй ночи';
    } else if (now.getHours() >= 6 && now.getHours() < 12) {
      return 'Доброе утро';
    } else if (now.getHours() >= 12 && now.getHours() < 18) {
      return 'Добрый день';
    } else {
      return 'Добрый вечер';
    }
  }

  textBlock.textContent = '';
  textBlock.insertAdjacentHTML('afterbegin', `
    <p>${getDayPart()}</p>
    <p>Сегодня: ${nowWeekDay}</p>
    <p>Текущее время: ${nowTime}</p>
    <p>До нового года осталось ${newYearTimer} дней</p>
  `);
}

setInterval(getDate, 1000);