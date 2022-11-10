'use strict';
// import compose from './compose.js';
import scroll from './scroll.js';
import menu from './menu.js';
import toggleTheme from './theme.js';
import demos from './demo.js';
import modal from './modal.js';
// import getPagename from './utils/getPagename.js';
// import getVarsFor from './getVars.js';

// const pagename = getPagename();
// const vars = getVarsFor(pagename);

// Initiators
// async function initPrio1() {
//   await compose(vars);
// }

function initPrio1() {
  menu();
  demos();
  scroll();
}

function initPrio2() {
  toggleTheme(vars.showFooterVisual);
  vars.useModal && modal(vars.userType);
}

// Init
initPrio1()
  .then((_) => {
    initPrio2();
    // initPrio3();
  })
  .catch((err) => {
    console.error('Init error:', err);
  });
