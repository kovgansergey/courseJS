'use strict';

document.addEventListener('DOMContentLoaded', function() {

  function DomElement(selector, height, width, bg) {
    this.newElem = '';
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.top = 200;
    this.left = 200;
  }

  DomElement.prototype.createElem = function() {
    this.newElem = document.createElement('div');
    this.newElem.className = this.selector;
    this.newElem.style.cssText = 'height: ' + this.height + `;
                              width: ` + this.width + `;
                              background: ` + this.bg + `;
                              position: absolute;`;

    document.body.append(this.newElem);

    document.addEventListener('keydown', function(event) {
      
      if (event.key === "ArrowUp") {
        this.top -= 10;
        this.moveElem(this.top, this.left);
      }
      if (event.key === "ArrowRight") {
        this.left += 10;
        this.moveElem(this.top, this.left);
      }
      if (event.key === "ArrowDown") {
        this.top += 10;
        this.moveElem(this.top, this.left);
      }
      if (event.key === "ArrowLeft") {
        this.left -= 10;
        this.moveElem(this.top, this.left);
      }
    }.bind(this));

    this.moveElem(this.top, this.left);
  };

  DomElement.prototype.moveElem = function(top, left) {
    this.newElem.style.top = top + 'px';
    this.newElem.style.left = left + 'px';
  };

  let block = new DomElement('.square', '100px', '100px', 'green');
  block.createElem();
});