'use strict';
const doc = document;

function nav() {
  const burger = doc.querySelector('.burger');
  const lines = doc.querySelectorAll('.burger-line');
  const menu = doc.querySelector('.menu');
  let show = false;

  console.log(lines);

  burger.addEventListener('click', (e) => {
    console.log('menu clicked');
    if (!show) {
      menu.style = 'display: block';
      show = true;
    } else {
      menu.style = 'display: none';
      show = false;
    }
  });
}

export default nav;
