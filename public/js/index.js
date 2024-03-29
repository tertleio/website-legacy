'use strict';
import compose from './compose.js';
import scroll from './scroll.js';
import menu from './menu.js';
import toggleTheme from './theme.js';
import demos from './demo.js';
import modal from './modal.js';
import getPagename from './utils/getPagename.js';
import getVarsFor from './vars.js';

const page = getPagename();
const vars = getVarsFor(page);

// Initiators
async function initPrio1() {
  compose(vars);
}

function initPrio2() {
  menu();
  demos();
  scroll(page, vars.usePopCta, vars.usePeekaboo);
  toggleTheme(vars.showFooterVisual);
  vars.useModal && modal(vars.userType);
}

// Init
initPrio1()
  .then((_) => {
    initPrio2();
  })
  .catch((err) => {
    console.error('Init error:', err);
  });
