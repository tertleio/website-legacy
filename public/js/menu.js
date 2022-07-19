'use strict';
const doc = document;

const elBurger = doc.querySelector('#burger-ico');
const elMenu = doc.querySelector('#burger-menu');

console.log(elMenu);
console.log(elBurger);

function closeMenu(e) {
  if (e.target.className.includes('burger')) return;
  elMenu.style = 'display: none';
  show = false;
  window.removeEventListener('click', closeMenu);
}

function openMenu(e) {
  console.log(e.target);
  elMenu.style = 'display: block';
  if (show) window.addEventListener('click', closeMenu);
}

const menu = () => elBurger.addEventListener('click', openMenu);

export default menu;
