'use strict';
const doc = document;

const menu = () => {
  const elBurger = doc.querySelector('#burger');
  const elMenu = doc.querySelector('.menu-burger');
  const elsMenuLink = doc.querySelectorAll('.menu-link');

  elBurger.addEventListener('touchstart', openMenu);
  // elsMenuLink.forEach((link) => link.addEventListener('click', closeMenu));

  function openMenu(e) {
    elMenu.style = 'display: block;';
    window.addEventListener('touchstart', closeMenu, {
      capture: true,
      once: true,
    });
  }

  function closeMenu(e) {
    e.stopPropagation();

    setTimeout(() => {
      elMenu.style = 'display: none;';
    }, 100);
  }
};

export default menu;
