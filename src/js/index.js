'use strict';
import compose from './compose.js';
import scroll from './scroll.js';
import menu from './menu.js';
import toggleTheme from './theme.js';
import matrix from './matrix.js';
import demos from './demo.js';
import modal from './modal.js';

const pathname = window.location.pathname.split('/');
const filename = pathname[pathname.length - 1];
const [pagename] = filename.split('.', [1]); // TODO: remove when ext is removed

function isModalInUse(page) {
  // prettier-ignore
  switch(page) {
    case 'index': return false;
    case 'founders': return false;
    case 'investors': return true;
    case 'contractors': return true;
    case 'hirers': return true;
    default: console.log(`Invalid arg: '${page}'`)
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
  isModalInUse(pagename) && modal();
  // matrix();
}

// Init
initPrio1()
  // TODO: separate out init dependencies and non-dependencies and handle err
  .then((_) => {
    initPrio2();
    initPrio3();
  })
  .catch((err) => {
    console.error('Init error:', err);
  });
