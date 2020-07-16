  export default function slider() {
    const slider = document.querySelector('.portfolio-content');
    const slide = slider.querySelectorAll('.portfolio-item');
    const portfolioDots = slider.querySelector('.portfolio-dots');

    let currentSlide = 0;
    let interval;

    function getDots() {
      for (let i = 0; i < slide.length; i++) {
        portfolioDots.insertAdjacentHTML('beforeend', '<li class="dot"></li>');
      }
    }

    getDots();

    const dot = slider.querySelectorAll('.dot');
    dot[0].classList.add('dot-active');

    function prevSlide(elem, index, strClass) {
      elem[index].classList.remove(strClass);
    }

    function nextSlide(elem, index, strClass) {
      elem[index].classList.add(strClass);
    }

    function autoPlaySlide() {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    }

    function startSlide(time = 2000) {
      interval = setInterval(autoPlaySlide, time);
    }

    function stopSlide() {
      clearInterval(interval);
    }

    slider.addEventListener('click', event => {
      event.preventDefault();
      const target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((item, i) => {
          if (item === target) {
            currentSlide = i;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', event => {
      if (event.target.matches('.portfolio-btn, .dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', event => {
      if (event.target.matches('.portfolio-btn, .dot')) {
        startSlide();
      }
    });

    startSlide(2000);
  }