'use strict';
const doc = document;
import loadHtml from './utils/loadHtml.js';

function simFetch(vals) {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        status: 'success',
        payload: vals,
      });
    }, 100);
  });
}

async function handleModal(e, email) {
  const modalHtml = await loadHtml('../components/modal.html', import.meta.url);
  const elModal = doc.querySelector('#overlay-modal');

  // Open
  elModal.style = '';
  elModal.innerHTML = modalHtml;
  // TODO: focus modal for tabs and disable bg interactions

  // Insert initial email if exists
  if (email) {
    const elEmail = elModal.querySelector('#email');
    elEmail.value = email;
  }

  // Listen for second submit
  const formTwo = elModal.querySelector('#formTwo');
  formTwo.addEventListener('submit', onSecondarySubmit);

  // Close
  const elCloseBtn = doc.querySelector('.modal-close');
  elCloseBtn.addEventListener(
    'click',
    () => {
      elModal.style.display = 'none';
    },
    { once: true }
  );
}

async function onSecondarySubmit(e) {
  e.preventDefault();

  const fields = e.target.querySelectorAll('.field');
  const vals = [...fields].map((f) => ({ [f.name]: f.value }));

  simFetch(vals)
    .then((res) => {
      const { status, payload } = res;
      if (status !== 'success') throw new Error('Problem submitting data');

      const elSuccess = doc.querySelector('#modal-success');
      elSuccess.style = '';
      // add id to local storage incase of error or resubmission
      // update db to delete old and add new/correct
    })
    .catch((err) => {
      console.log(err);
      // notify user there was a problem
    });

  return false;
}

async function onInitialSubmit(e) {
  e.preventDefault();
  const email = e.target.querySelector('input').value;

  handleModal(e, email);
  const res = await simFetch(email);

  return false;
}

const ctrler = () => {
  const formOne = doc.querySelector('#formOne');
  const elNavCta = doc.querySelector('.ctaOne');

  formOne.addEventListener('submit', onInitialSubmit);
  elNavCta.addEventListener('click', handleModal);
};

export default ctrler;
