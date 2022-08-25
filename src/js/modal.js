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
        // if (json.status !== 'success') throw new Error('Form submit problem');
        let wasSuccess;
        if (json.code === 409) wasSuccess = false;
        else if (json.status === 'success') wasSuccess = true;
        else throw new Error('Form submit problem');

        return { wasSuccess, res: json };
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem('waitlistId');
        return { wasSuccess: false, res: err };
      });
  }

  async function handleSubmits(e) {
    e.preventDefault();
    const formData = getFormData(e);
    const { wasSuccess, res } = await sendFormData(formData);
    let { code, msg, payload } = res;

    const msgSuccess = `Thanks for signing up. We'll be in touch via email soon!`;
    const msgError = `Something went wrong. Please try again or contact
                      <a href="mailto: hello@tertle.io">hello@tertle.io</a>`;

    if (e.target.id === 'formOne') await toggleModal();
    const elInfoContainer = elModal.querySelector('#modal-info-container');
    const elInfo = elModal.querySelector('#modal-info');
    const elFormTwo = elModal.querySelector('#formTwo');

    if (wasSuccess) {
      // handle row id
      localStorage.setItem('waitlistId', payload.id);
      if (payload?.clearId) localStorage.removeItem('waitlistId');

      // initial email insertion to main form
      if (e.target.id === 'formOne' && wasSuccess) {
        const elEmail = elModal.querySelector('#email');
        elEmail.value = formData.email;
        console.log('RETURNING AS IS FORM ONE AND SUCCESS');
        return;
      }

      // hide submitted form
      if (code === 200) elFormTwo.style.display = 'none';
    }

    // res feedback
    let bgColor;
    if (code === 201 || code === 200) {
      bgColor = 'success';
      msg = msgSuccess;
    } else if (code === 409) {
      bgColor = 'warn';
    } else {
      bgColor = 'error';
      msg = msgError;
    }

    elInfoContainer.style = '';
    elInfoContainer.className = bgColor;
    elInfo.style = '';
    console.log('__MSG__', res);
    elInfo.innerHTML = msg;

    return false;
  }
};

export default modal;
