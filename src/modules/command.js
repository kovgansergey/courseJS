  export default function command() {
    const command = document.getElementById('command');

    const changePhoto = item => {
      [item.src, item.dataset.img] = [item.dataset.img, item.src];
    };

    command.addEventListener('mouseover', event => {
      const target = event.target;

      if (target.tagName === 'IMG' && target.dataset.img) {
        changePhoto(target);
      }
    });

    command.addEventListener('mouseout', event => {
      const target = event.target;

      if (target.tagName === 'IMG' && target.dataset.img) {
        changePhoto(target);
      }
    });
  }