  export default function toggleMenu() {
    const menu = document.querySelector('menu');

    // функция плавного скролла ссылок меню
    function scrollLink(item) {

      const blockId = item.getAttribute('href').substr(1);

      document.getElementById(blockId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // одно событие на весь документ
    document.addEventListener('click', event => {
      let target = event.target;

      // если меню активировано - закрытие при клике мимо меню
      if (menu.classList.contains('active-menu') && !target.closest('menu')) {
        menu.classList.remove('active-menu');
      }

      // открытие меню при клике на кнопку меню
      if (target.closest('.menu')) {
        menu.classList.add('active-menu');
      }

      // закрытие меню и скролл ссылок в меню и на главной секции
      if (target.closest('main') || target.closest('menu')) {
        target = target.closest('a');

        if (target) {
          event.preventDefault();
          menu.classList.remove('active-menu');

          if (!target.classList.contains('close-btn')) {
            scrollLink(target);
          }
        }
      }
    });
  }