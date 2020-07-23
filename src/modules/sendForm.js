export default function sendForm(formId) {
  const form = document.getElementById(formId);

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `font-size: 2rem; position: absolute;
    left: 50%; bottom: 5px; transform: translateX(-50%)`;

  function clearInputs() {
    const formInputs = form.querySelectorAll('input');

    formInputs.forEach(item => {
      item.value = '';
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
    const body = {};

    for (const val of formData.entries()) {
      body[val[0]] = val[1];
    }

    postData(body,
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

  form.addEventListener('submit', submitForm);
  form.addEventListener('input', inputValidate);
}