'use strict';
const doc = document;
import loadHtml from './utils/loadHtml.js';

async function toggleModal(email) {
  const modalHtml = await loadHtml('../components/modal.html', import.meta.url);
  const elModal = doc.querySelector('#overlay-modal');
  // Open
  elModal.style = '';
  elModal.innerHTML = modalHtml;

  if (email) {
    const elEmail = elModal.querySelector('#email');
    elEmail.value = email;
  }

  const elCloseBtn = doc.querySelector('.modal-close');
  // Close
  elCloseBtn.addEventListener(
    'click',
    () => {
      elModal.style.display = 'none';
    },
    { once: true }
  );
}

function simFetch(email) {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        status: 'success',
        payload: email,
      });
    }, 100);
  });
}

async function onSubmit(e) {
  e.preventDefault();
  const email = e.target.querySelector('input').value;

  toggleModal(email);
  const res = await simFetch(email);

  return false;
}

const ctrler = () => {
  const formOne = doc.querySelector('#formOne');
  formOne.addEventListener('submit', onSubmit);
};

export default ctrler;
