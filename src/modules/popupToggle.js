export default function popupToggle(popupSelector, bodyData = {}) {
  const popup = document.querySelector(popupSelector),
    form = popup.querySelector('form');

  // навешивание события отправки формы для конкретного-открытого модального окна
  // и удаление при закрытии, чтоб лишние события не навешивались
  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `font-size: 2rem; position: absolute;
    left: 50%; bottom: 5px; transform: translateX(-50%)`;

  function clearInputs() {
    const formInputs = form.querySelectorAll('input');

    formInputs.forEach(item => {
      item.value = '';
      item.style.outline = 'none';
      item.style.boxShadow = 'none';
    });
  }

  function postData(body, outputData, errorData) {
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {

      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        outputData();
        clearInputs();
      } else {
        errorData(request.status);
      }
    });

    request.open('POST', './server.php');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(body));
  }

  function submitForm(event) {
    event.preventDefault();

    const phoneInput = form.querySelector('.phone-user');
    if (phoneInput.value.length !== 16) {
      phoneInput.style.border = '1px solid red';
      return;
    } else {
      phoneInput.style.border = '';
    }
    
    form.append(statusMessage);
    statusMessage.textContent = 'Идет отправка';
    const formData = new FormData(form);

    for (const val of formData.entries()) {
      bodyData[val[0]] = val[1];
    }

    postData(bodyData,
      () => {
        statusMessage.textContent = 'Отправлено';
      },
      (error) => {
        statusMessage.textContent = 'Ошибка';
        console.error(error);
      });
  }

  function inputValidate(event) {
    const target = event.target;

    if (target.name === 'user_name') {
      target.value = target.value.replace(/[^а-яё]/i, '');
    }
  }

  // функции открытия-закрытия модального окна
  function popupAnimate(popup) {
    let opacity = 0;
    requestAnimationFrame(function popupAnim() {
      popup.style.opacity = opacity / 100;

      if (opacity < 100) {
        opacity += 3;
        requestAnimationFrame(popupAnim);
      } else {
        popup.style.opacity = '';
      }
    });
  }

  function popupClose(event) {
    const target = event.target;
    
    if (target.classList.contains('popup-close') || !target.closest('.popup-content')) {
      this.style.display = '';
      this.removeEventListener('click', popupClose);
      form.removeEventListener('submit', submitForm);
      form.removeEventListener('input', inputValidate);
      clearInputs();
      statusMessage.remove();
    }
  }

  function popupOpen(popup) {
    popup.style.opacity = 0;
    popup.style.display = 'block';
    popupAnimate(popup);
    popup.addEventListener('click', popupClose);
  }

  form.addEventListener('submit', submitForm);
  form.addEventListener('input', inputValidate);

  popupOpen(popup);
}