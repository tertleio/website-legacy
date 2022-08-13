'use strict';
import compose from './compose.js';
import scroll from './scroll.js';
import menu from './menu.js';
import toggleTheme from './theme.js';
import demos from './demo.js';
import modal from './modal.js';
import matrix from './matrix.js';
import getPagename from './utils/getPagename.js';

const pagename = getPagename();

function isModalInUse() {
  // prettier-ignore
  switch(pagename) {
    case 'index': return false;
    case 'founders': return false;
    case 'investors': return true;
    case 'contractors': return true;
    case 'hirers': return true;
    default: console.log(`Invalid arg: '${pagename}'`)
  }
}

// Initiators
async function initPrio1() {
  await compose(pagename);
}

function initPrio2() {
  menu();
  demos();
  scroll();
}

function initPrio3() {
  toggleTheme();
  isModalInUse() && modal();
  // matrix();
}

// Init
initPrio1()
  .then((_) => {
    initPrio2();
    initPrio3();
  })
  .catch((err) => {
    console.error('Init error:', err);
  });
