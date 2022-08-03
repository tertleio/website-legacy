'use strict';
const doc = document;

function demo() {
  const elContent = document.querySelector('.content-container');
  const elsDemo = document.querySelectorAll('.demo');

  doc.querySelectorAll('.content-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const elCurrentActive = elContent.querySelector('.--active');
      btn.classList.add('--active');
      elCurrentActive.classList.remove('--active');

      const targetId = e.target.id.split('-')[1];
      const targetEl = elsDemo[targetId - 1];

      elsDemo.forEach((demo) => demo.classList.remove('--active'));
      targetEl.classList.add('--active');
    });
  });
}

export default demo;
