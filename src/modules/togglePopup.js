  export default function togglePopup() {
    const popup = document.querySelector('.popup');
    const popupBtn = document.querySelectorAll('.popup-btn');

    function popupAnimate() {
      let opacity = 0;
      requestAnimationFrame(function popupAnim() {
        popup.style.opacity = opacity / 100;

        if (opacity <= 100) {
          opacity += 3;
          requestAnimationFrame(popupAnim);
        }
      });
    }

    popupBtn.forEach(item => item.addEventListener('click', () => {
      popup.style.display = 'block';
      popup.style.opacity = 0;
      if (window.innerWidth >= 768) {
        popupAnimate();
      }
    }));

    popup.addEventListener('click', event => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popup.style.display = '';
      } else {
        target = target.closest('.popup-content');

        if (!target) {
          popup.style.display = '';
        }
      }
    });
  }