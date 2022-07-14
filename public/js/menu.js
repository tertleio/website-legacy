'use strict';
const doc = document;

const elBurger = doc.querySelector('.burger-menu');
const elMenu = doc.querySelector('.menu');
let show = false;

function closeMenu(e) {
  if (e.target.className.includes('burger')) return;
  elMenu.style = 'display: none';
  show = false;
  window.removeEventListener('click', closeMenu);
}

function openMenu() {
  elMenu.style = 'display: block';
  if (!show) show = true;
  if (show) window.addEventListener('click', closeMenu);
}

const menu = () => elBurger.addEventListener('click', openMenu);

export default menu;
