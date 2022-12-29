'use strict';
const doc = document;

const barTxt = {
  s1: ['match', 'profiles'],
  s2: ['introductions', 'filter'],
  s3: ['schedule', 'message', 'dashboard'],
};

function demo() {
  const elsContent = doc.querySelectorAll('.feature');

  elsContent.forEach((c) => {
    const barArr = barTxt[c.id];
    console.log(barTxt);
    const elsDemo = c.querySelectorAll('.demo__dt');
    console.log('elsDemo', elsDemo);

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
