!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function o(e){const t=document.getElementById(e),n=document.createElement("div");n.style.cssText="font-size: 2rem; color: white;";const o=document.createElement("style");t.addEventListener("input",e=>{const t=e.target;"user_phone"===t.name&&(t.value=t.value.replace(/[^\+\d]/,"")),"user_name"!==t.name&&"user_message"!==t.name||(t.value=t.value.replace(/[^а-яё\s]/i,""))}),t.addEventListener("submit",e=>{e.preventDefault(),t.append(n),n.innerHTML='<div class="sk-three-bounce">\n                                  <div class="sk-bounce-1 sk-child"></div>\n                                  <div class="sk-bounce-2 sk-child"></div>\n                                  <div class="sk-bounce-3 sk-child"></div>\n                                </div>',o.textContent=".sk-three-bounce {\n                            width: 8em;\n                            margin: auto;\n                            text-align: center;\n                          }\n                          \n                          .sk-three-bounce .sk-child {\n                            width: 18px;\n                            height: 18px;\n                            background-color: white;\n                            border-radius: 100%;\n                            display: inline-block;\n                            animation: sk-three-bounce 1.4s ease-in-out 0s infinite both;\n                          }\n                          \n                          .sk-three-bounce .sk-bounce-1 {\n                            animation-delay: -0.32s;\n                          }\n                          \n                          .sk-three-bounce .sk-bounce-2 {\n                            animation-delay: -0.16s;\n                          }\n                          \n                          @keyframes sk-three-bounce {\n                            0%, 80%, 100% {\n                              transform: scale(0);\n                            }\n                            40% {\n                              transform: scale(1);\n                            }\n                          }",document.head.append(o);const r=new FormData(t);var c;(c=r,fetch("./server.php",{method:"POST",headers:{"Content-Type":"multipart/form-data"},body:c})).then(e=>{if(200!==e.status)throw new Error("status network is not 200");n.textContent="Спасибо! Мы скоро с вами свяжемся!",t.querySelectorAll("input").forEach(e=>{e.value=""}),o.remove()}).catch(e=>{n.textContent="Что-то пошло не так...",o.remove(),console.error(e)})})}n.r(t),function(e){const t=document.querySelector("#timer-hours"),n=document.querySelector("#timer-minutes"),o=document.querySelector("#timer-seconds");function r(e){return e<=9?"0"+e:e}const c=setInterval(()=>{const a=function(){const t=(new Date(e).getTime()-(new Date).getTime())/1e3,n=Math.floor(t%60),o=Math.floor(t/60%60);return{timeRemaining:t,hours:Math.floor(t/3600),minutes:o,seconds:n}}();a.timeRemaining<0?clearInterval(c):(t.textContent=r(a.hours),n.textContent=r(a.minutes),o.textContent=r(a.seconds))},1e3)}("2 july 2020"),function(){const e=document.querySelector("menu");document.addEventListener("click",t=>{let n=t.target;e.classList.contains("active-menu")&&!n.closest("menu")&&e.classList.remove("active-menu"),n.closest(".menu")&&e.classList.add("active-menu"),(n.closest("main")||n.closest("menu"))&&(n=n.closest("a"),n&&(t.preventDefault(),e.classList.remove("active-menu"),n.classList.contains("close-btn")||function(e){const t=e.getAttribute("href").substr(1);document.getElementById(t).scrollIntoView({behavior:"smooth",block:"start"})}(n)))})}(),function(){const e=document.querySelector(".popup");document.querySelectorAll(".popup-btn").forEach(t=>t.addEventListener("click",()=>{e.style.display="block",window.innerWidth>=768&&function(){let t=0;requestAnimationFrame((function n(){e.style.opacity=t+"%",t<=100&&(t+=3,requestAnimationFrame(n))}))}()})),e.addEventListener("click",t=>{let n=t.target;n.classList.contains("popup-close")?e.style.display="":(n=n.closest(".popup-content"),n||(e.style.display=""))})}(),function(){const e=document.querySelector(".service-header"),t=e.querySelectorAll(".service-header-tab"),n=document.querySelectorAll(".service-tab");e.addEventListener("click",e=>{const o=e.target.closest(".service-header-tab");o&&t.forEach((e,r)=>{e===o&&function(e){for(let o=0;o<n.length;o++)e===o?(t[o].classList.add("active"),n[o].classList.remove("d-none")):(t[o].classList.remove("active"),n[o].classList.add("d-none"))}(r)})})}(),function(){const e=document.querySelector(".portfolio-content"),t=e.querySelectorAll(".portfolio-item"),n=e.querySelector(".portfolio-dots");let o,r=0;!function(){for(let e=0;e<t.length;e++)n.insertAdjacentHTML("beforeend",'<li class="dot"></li>')}();const c=e.querySelectorAll(".dot");function a(e,t,n){e[t].classList.remove(n)}function s(e,t,n){e[t].classList.add(n)}function i(){a(t,r,"portfolio-item-active"),a(c,r,"dot-active"),r++,r>=t.length&&(r=0),s(t,r,"portfolio-item-active"),s(c,r,"dot-active")}function l(e=2e3){o=setInterval(i,e)}c[0].classList.add("dot-active"),e.addEventListener("click",e=>{e.preventDefault();const n=e.target;n.matches(".portfolio-btn, .dot")&&(a(t,r,"portfolio-item-active"),a(c,r,"dot-active"),n.matches("#arrow-right")?r++:n.matches("#arrow-left")?r--:n.matches(".dot")&&c.forEach((e,t)=>{e===n&&(r=t)}),r>=t.length&&(r=0),r<0&&(r=t.length-1),s(t,r,"portfolio-item-active"),s(c,r,"dot-active"))}),e.addEventListener("mouseover",e=>{e.target.matches(".portfolio-btn, .dot")&&clearInterval(o)}),e.addEventListener("mouseout",e=>{e.target.matches(".portfolio-btn, .dot")&&l()}),l(2e3)}(),function(e=100){const t=document.querySelector(".calc-block"),n=t.querySelector(".calc-type"),o=t.querySelector(".calc-square"),r=t.querySelector(".calc-count"),c=t.querySelector(".calc-day"),a=t.querySelector("#total");t.addEventListener("input",e=>{const t=e.target;"INPUT"===t.tagName&&(t.value=t.value.replace(/\D/,""))});const s=()=>{let t=0,s=1,i=1;const l=n.options[n.selectedIndex].value,u=+o.value;r.value>1&&(s+=(r.value-1)/10),c.value&&c.value<5?i*=2:c.value&&c.value<10&&(i*=1.5),l&&u&&(t=e*l*u*s*i),(e=>{let t=0;requestAnimationFrame((function n(){a.textContent=t,t<e?(t+=Math.floor(e/100),requestAnimationFrame(n)):a.textContent=e}))})(Math.floor(t))};t.addEventListener("change",e=>{e.target.matches(".calc-item")&&s()})}(100),function(){const e=document.getElementById("command"),t=e=>{[e.src,e.dataset.img]=[e.dataset.img,e.src]};e.addEventListener("mouseover",e=>{const n=e.target;"IMG"===n.tagName&&n.dataset.img&&t(n)}),e.addEventListener("mouseout",e=>{const n=e.target;"IMG"===n.tagName&&n.dataset.img&&t(n)})}(),o("form1"),o("form2"),o("form3")}]);