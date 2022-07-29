'use strict';
const doc = document;

const menu = () => {
  const elBurger = doc.querySelector('#burger');
  const elMenu = doc.querySelector('.menu-burger');
  // const elsMenuLink = doc.querySelectorAll('.menu-link');

  elBurger.addEventListener('click', toggleMenu);

  function toggleMenu() {
    elMenu.classList.toggle('--active');
  }
};

export default menu;
