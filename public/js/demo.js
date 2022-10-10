'use strict';
const doc = document;

function demo() {
  const elContent = doc.querySelector('.content-container');
  const elsDemo = doc.querySelectorAll('.demo__dt');

  doc.querySelectorAll('.content-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const elCurrActive = elContent.querySelector('.--active');
      elCurrActive.classList.remove('--active');

      btn.classList.add('--active');

      const targetId = e.target.id.split('-')[1];
      const targetEl = elsDemo[targetId - 1];

      elsDemo.forEach((demo) => demo.classList.remove('--active'));
      targetEl.classList.add('--active');
    });
  });
}

export default demo;
