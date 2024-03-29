'use strict';
const doc = document;

const barTxt = {
  'quality-over-quantity': ['match', 'profiles'],
  'smart-matching': ['introductions', 'filter'],
  'real-conversations': ['schedule', 'message', 'dashboard'],
};

function demo() {
  const elsContent = doc.querySelectorAll('.feature');

  elsContent.forEach((c) => {
    const barArr = barTxt[c.id];
    const elsDemo = c.querySelectorAll('.demo__dt');

    c.querySelectorAll('.content-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        // get dom
        const targetId = e.target.id.split('-')[1] - 1;
        const targetEl = elsDemo[targetId];
        const elCurrActive = c.querySelector('.--active');
        const elBar = c.querySelector('.demo-head__bar span');

        // update buttons
        elCurrActive.classList.remove('--active');
        btn.classList.add('--active');

        // update demo image
        elsDemo.forEach((demo) => demo.classList.remove('--active'));
        targetEl.classList.add('--active');

        // update demo bar text
        elBar.innerHTML = barArr[targetId];
      });
    });
  });
}

export default demo;
