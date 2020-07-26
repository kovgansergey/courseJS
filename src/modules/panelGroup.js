export default function panelGroup(target) {
  const panelGroup = target.closest('.panel-group'),
    panelHeading = panelGroup.querySelectorAll('.panel-heading'),
    panelCollapse = panelGroup.querySelectorAll('.panel-collapse');

  if (target.closest('a')) event.preventDefault();

  function hideCollapse() {
    panelCollapse.forEach(item => item.classList.remove('in'));
  }

  function animateCollapse(elem) {
    let coin = 0;
    const stop = elem.clientHeight;

    requestAnimationFrame(function animCollapse() {
      elem.style.height = coin + 'px';

      if (coin < stop) {
        coin += 10;
        requestAnimationFrame(animCollapse);
      } else {
        elem.style.height = '';
      }
    });
  }

  if (target.closest('.panel-heading')) {
    for (let i = 0; i < panelHeading.length; i++) {
      if (panelHeading[i].id === target.closest('.panel-heading').id && !panelCollapse[i].classList.contains('in')) {
        hideCollapse();
        panelCollapse[i].classList.add('in');
        animateCollapse(panelCollapse[i]);
        break;
      }
    }
  }

  if (target.closest('a') && target.closest('a').classList.contains('construct-btn')) {
    const link = target.closest('a').getAttribute('href').slice(1);
    hideCollapse();
    for (let i = 0; i < panelCollapse.length; i++) {
      if (panelCollapse[i].id === link) {
        panelCollapse[i].classList.add('in');
        animateCollapse(panelCollapse[i]);
        break;
      }
    }
  }
}