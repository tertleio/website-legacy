'use strict';
const doc = document;

const menu = () => {
  const elBurger = doc.querySelector('#burger-ico');
  const elMenu = doc.querySelector('#burger-list');
  const elDropdown = doc.querySelector('#dropdown');
  const elsItem = doc.querySelectorAll('.closeOnE');

  elBurger.addEventListener('click', (e) => toggleActive(elMenu, e));
  elDropdown.addEventListener('click', (e) => toggleActive(elDropdown, e));
  elsItem.forEach((elItem) =>
    elItem.addEventListener('click', () =>
      elDropdown.classList.remove('--active')
    )
  );

  function toggleActive(argEl, e) {
    if (argEl.classList.contains('--active')) {
      argEl.classList.remove('--active');
      doc.activeElement.blur();
    } else {
      argEl.classList.add('--active');
      doc.activeElement.blur();
    }
  }
};

export default menu;
