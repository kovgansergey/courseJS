'use strict';

const booksList = document.querySelectorAll('.book');
const body = document.querySelector('body');
const booksName3 = booksList[4].querySelector('[target="_blank"]');
const advertisement = document.querySelector('.adv');
const chaptersList2 = booksList[0].querySelectorAll('li');
console.log(chaptersList2);

booksList[0].before(booksList[1]);
booksList[0].after(booksList[4]);
booksList[5].after(booksList[2]);

body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

booksName3.textContent = 'Книга 3. this и Прототипы Объектов';

advertisement.remove();

