'use strict';
const doc = document;
import loadHtml from './utils/loadHtml.js';

async function toggleModal() {
  const modalHtml = await loadHtml('../components/modal.html', import.meta.url);
  const elModal = doc.querySelector('#overlay-modal');
  // Open
  elModal.style = '';
  elModal.innerHTML = modalHtml;

  const elCloseBtn = doc.querySelector('.modal-close');
  // Close
  // elCloseBtn.addEventListener(
  //   'click',
  //   () => {
  //     elModal.style.display = 'none';
  //   },
  //   { once: true }
  // );
}

function onSubmit(e) {
  e.preventDefault();
  const email = e.target.querySelector('input').value;
  console.log('email', email);

  // toggleModal();
  // const res = fetch('https://app.tertle.io/api/sign/')

  return false;
}

const ctrler = () => {
  const formOne = doc.querySelector('#formOne');
  formOne.addEventListener('submit', onSubmit);
};

export default ctrler;
