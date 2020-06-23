'use strict';

let usersSelector = prompt('Введите класс или id блока (Например: ".name" или "#name")');
let usersHeight = prompt('Введите высоту блока с единицей измерения (Например: "100px")');
let usersWidth = prompt('Введите ширину блока с единицей измерения (Например: "100px")');
let usersBg = prompt('Введите свойство заднего фона (цвет, URL-путь к картинке и т.д.)');
let usersFontSize = prompt('Введите размер шрифта блока с единицей измерения (Например: "18px")');
let usersText = prompt('Введите любой текст');

function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.createElem = function() {
  let newElem;

  if (this.selector.charAt(0) === '.') {
    newElem = document.createElement('div');
    newElem.className = this.selector.slice(1);
  }

  if (this.selector.charAt(0) === '#') {
    newElem = document.createElement('p');
    newElem.id = this.selector.slice(1);
  }
  
  newElem.style.cssText = 'height: ' + this.height + `;
                            width: ` + this.width + `;
                            background: ` + this.bg + `;
                            font-size: ` + this.fontSize + ';';

  newElem.textContent = usersText;
  document.body.append(newElem);
};

let block = new DomElement(usersSelector, usersHeight, usersWidth, usersBg, usersFontSize);
block.createElem();