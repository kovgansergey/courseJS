'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'fetch-polyfill';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();
import 'mdn-polyfills/Node.prototype.append';
import 'mdn-polyfills/Node.prototype.remove';


import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calculator from './modules/calculator';
import command from './modules/command';
import sendForm from './modules/sendForm';

// Таймер
countTimer('18 july 2020');

// меню
toggleMenu();

// модальное окно
togglePopup();

// табы
tabs();

// слайдер
slider();

// калькулятор
calculator(100);

// команда
command();

// send-ajax-form
sendForm('form1');
sendForm('form2');
sendForm('form3');