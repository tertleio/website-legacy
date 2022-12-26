'use strict';
const doc = document;

function demo() {
  // get all the features
  const elContent = doc.querySelectorAll('.feature');
  // console.log(elsDemo);

  elContent.forEach((c) => {
    const elsDemo = c.querySelectorAll('.demo__dt');

    c.querySelectorAll('.content-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const elCurrActive = c.querySelector('.--active');
        elCurrActive.classList.remove('--active');

        btn.classList.add('--active');

        const targetId = e.target.id.split('-')[1];
        const targetEl = elsDemo[targetId - 1];

        elsDemo.forEach((demo) => demo.classList.remove('--active'));
        targetEl.classList.add('--active');
      });
    });
  });
}

export default demo;
