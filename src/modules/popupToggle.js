export default function popupToggle(popupSelector) {
  const popup = document.querySelector(popupSelector);

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
    }
  }

  function popupOpen(popup) {
    popup.style.display = 'block';
    popupAnimate(popup);
    popup.addEventListener('click', popupClose);
  }

  popupOpen(popup);
}