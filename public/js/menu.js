'use strict';
const doc = document;

let isShowing = false;

function closeMenu() {
  console.log('closing');
  // elMenu.style = 'display: none;';
  isShowing = false;
  window.removeEventListener('click', closeMenu);
}

function toggleMenu() {
  console.log('clicked');
  if (isShowing === false) {
    console.log('yes');
    // elMenu.style = 'display: block;';
    window.addEventListener('click', () => closeMenu);
    isShowing = true;
    return;
  } else closeMenu();

  var styles = window.getComputedStyle(elBurger, '::after');
  var content = styles['content'];
  console.log(content);
}

const menu = () => {
  const elBurger = doc.querySelector('#burger');
  elBurger.addEventListener('click', toggleMenu);
};

export default menu;
