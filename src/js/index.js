'use strict';
import components from './compose.js';
import scroll from './scroll.js';
import menu from './menu.js';
import toggleTheme from './theme.js';
import matrix from './matrix.js';
import demos from './demo.js';
import modal from './modal.js';

async function initPrio1() {
  await components();
}

function initPrio2() {
  menu();
  demos();
  scroll();
}

function initPrio3() {
  toggleTheme();
  modal();
  // matrix();
}

// TODO: separate out init dependencies and non-dependencies and handle err
initPrio1()
  .then((_) => {
    initPrio2();
    initPrio3();
  })
  .catch((err) => {
    console.log(err);
  });
