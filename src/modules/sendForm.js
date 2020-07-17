  export default function sendForm(formID) {
    const errorMessage = 'Что-то пошло не так...';
    const successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const form = document.getElementById(formID);
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: white;';
    const style = document.createElement('style');

    function loadAnimate() {
      statusMessage.innerHTML = `<div class="sk-three-bounce">
                                  <div class="sk-bounce-1 sk-child"></div>
                                  <div class="sk-bounce-2 sk-child"></div>
                                  <div class="sk-bounce-3 sk-child"></div>
                                </div>`;

      style.textContent = `.sk-three-bounce {
                            width: 8em;
                            margin: auto;
                            text-align: center;
                          }
                          
                          .sk-three-bounce .sk-child {
                            width: 18px;
                            height: 18px;
                            background-color: white;
                            border-radius: 100%;
                            display: inline-block;
                            animation: sk-three-bounce 1.4s ease-in-out 0s infinite both;
                          }
                          
                          .sk-three-bounce .sk-bounce-1 {
                            animation-delay: -0.32s;
                          }
                          
                          .sk-three-bounce .sk-bounce-2 {
                            animation-delay: -0.16s;
                          }
                          
                          @keyframes sk-three-bounce {
                            0%, 80%, 100% {
                              transform: scale(0);
                            }
                            40% {
                              transform: scale(1);
                            }
                          }`;
      document.head.append(style);
    }

    form.addEventListener('input', event => {
      const target = event.target;

      if (target.name === 'user_phone') {
        target.value = target.value.replace(/[^\+\d]/, '');
      }

      if (target.name === 'user_name' || target.name === 'user_message') {
        target.value = target.value.replace(/[^а-яё\s]/i, '');
      }
    });

    function styleInputs(check) {
      const formInputs = form.querySelectorAll('input');

      formInputs.forEach(item => {
        if (check) {
          item.value = '';
          item.style.outline = 'none';
          item.style.boxShadow = 'none';
        } else {
          item.style.outline = '';
          item.style.boxShadow = '';
          item.style.border = '';
        }
        
      });
    }

    function postData(body) {
      return fetch('./server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: body
      });
    }

    form.addEventListener('click', event => {
      const target = event.target;
      if (target.classList.contains('form-btn')) {
        styleInputs(false);
      }
    });

    form.addEventListener('submit', event => {
      event.preventDefault();

      const phoneInput = form.querySelector('.form-phone');
      if (phoneInput.value.length !== 18) {
        phoneInput.style.border = '1px solid red';
        return;
      }

      form.append(statusMessage);
      loadAnimate();
      const formData = new FormData(form);

      postData(formData)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('status network is not 200');
          }
          statusMessage.textContent = successMessage;
          styleInputs(true);
          style.remove();
        })
        .catch(error => {
          statusMessage.textContent = errorMessage;
          style.remove();
          console.error(error);
        });
    });
  }