'use strict';
const doc = document;

const menu = () => {
  const elBurger = doc.querySelector('#burger-ico');
  const elMenu = doc.querySelector('#burger-list');
  elBurger.addEventListener('click', toggleMenu);

  function toggleMenu(e) {
    // e.preventDefault();
    elMenu.classList.toggle('--active');
  }
};

export default menu;
