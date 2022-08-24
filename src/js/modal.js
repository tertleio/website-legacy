'use strict';
const doc = document;
import loadHtml from './utils/loadHtml.js';

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

      // TODO: return length agnostic data
      dataStruct = {
        email: vals[0].email,
        firstName: vals[1].firstName,
        country: vals[2].country,
      };
    }

    return dataStruct;
  }

  async function sendFormData(data) {
    console.log('data', data);
    const url = 'http://localhost:1337/api/sign/waitlist/contractor';
    data.waitlistId = localStorage.getItem('waitlistId');
    const method = data.waitlistId ? 'PUT' : 'POST';

    console.log(data.waitlistId ? 'exists' : 'not exists');
    console.log('method', method);

    return fetch(url, {
      method,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status !== 'success') throw new Error('Form submit problem');
        return { wasSuccess: true, json };
      })
      .catch((err) => {
        console.log(err);
        return { wasSuccess: false, res: err.toString() };
      });
  }

  async function handleSubmits(e) {
    e.preventDefault();
    if (e.target.id === 'formOne') await toggleModal();
    const formData = getFormData(e);
    const { wasSuccess, json: res } = await sendFormData(formData);

    // Handle row id
    console.log('isClearId', res);
    if (wasSuccess) localStorage.setItem('waitlistId', res.payload.id);
    if (res.payload.clearId) {
      console.log('clearning Id');
      localStorage.removeItem('waitlistId');
    }

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
