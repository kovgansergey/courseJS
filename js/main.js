"use strict";

const booksList = document.querySelectorAll('.book');
const body = document.querySelector('body');
const booksName3 = booksList[4].querySelector('[target="_blank"]');
const advertisement = document.querySelector('.adv');
const chaptersList2 = booksList[0].querySelectorAll('li');
const chaptersList5 = booksList[5].querySelectorAll('li');
const chaptersList6 = booksList[2].querySelectorAll('li');

booksList[0].before(booksList[1]);
booksList[0].after(booksList[4]);
booksList[5].after(booksList[2]);

body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

booksName3.textContent = 'Книга 3. this и Прототипы Объектов';

advertisement.remove();

chaptersList2[9].after(chaptersList2[2]);
chaptersList2[4].before(chaptersList2[8]);
chaptersList2[3].after(chaptersList2[6]);

chaptersList5[4].after(chaptersList5[2]);
chaptersList5[8].before(chaptersList5[5]);
chaptersList5[3].before(chaptersList5[9]);

let newLi6 = document.createElement('li');
newLi6.textContent = 'Глава 8: За пределами ES6';
chaptersList6[8].after(newLi6);