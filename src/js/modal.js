'use strict';
const doc = document;
import loadHtml from './utils/loadHtml.js';

function simFetch(vals) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        status: 'success',
        payload: vals,
      });
    }, 100);
  });
}

const modal = () => {
  const elModal = doc.querySelector('#overlay-modal');
  const formOne = doc.querySelector('#formOne');
  const elNavCta = doc.querySelector('.ctaOne');
  formOne.addEventListener('submit', handleSubmits);
  elNavCta.addEventListener('click', toggleModal);

  let isOpen = false;
  let dataStruct = {
    email: '',
    firstName: '',
    country: '',
  };

  async function toggleModal() {
    const path = '../components/modal.html';
    const modalHtml = await loadHtml(path, import.meta.url);

    // Open
    elModal.style = '';
    elModal.innerHTML = modalHtml;

    // Listen for submit
    const formTwo = elModal.querySelector('#formTwo');
    formTwo.addEventListener('submit', handleSubmits);

    // Close
    const elCloseBtn = doc.querySelector('.modal-close');
    elCloseBtn.addEventListener(
      'click',
      () => {
        elModal.style.display = 'none';
      },
      { once: true }
    );

    isOpen = !isOpen;
  }

  function getFormData(e) {
    if (e.target.id === 'formOne') {
      const email = e.target.querySelector('input').value;
      dataStruct.email = email;
    } else if (e.target.id === 'formTwo') {
      const fields = e.target.querySelectorAll('.field');
      const vals = [...fields].map((f) => ({ [f.name]: f.value }));
      dataStruct = vals;
    }

    return dataStruct;
  }

  async function sendFormData(data) {
    return simFetch(data)
      .then(({ status, payload }) => {
        if (status !== 'success') throw new Error('Problem submitting form');

        return true;
      })
      .catch((err) => {
        console.log(err);
        // notify user there was a problem
      });
  }

  async function handleSubmits(e) {
    e.preventDefault();
    if (e.target.id === 'formOne') await toggleModal();
    const formData = getFormData(e);
    const wasSuccess = await sendFormData(formData);

    // Initial email insertion to main form
    if (e.target.id === 'formOne') {
      const elEmail = elModal.querySelector('#email');
      elEmail.value = formData.email;
      return;
    }

    // User feedback
    const elNotify = doc.querySelector(
      `#modal-${wasSuccess ? 'success' : 'error'}`
    );
    elNotify.style = '';

    // Hide submitted form
    elModal.querySelector('#formTwo').style.display = 'none';

    // add id to local storage incase of error or resubmission
    // update db to delete old and add new/correct

    return false;
  }
};

export default modal;
