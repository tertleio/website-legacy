'use strict';
const doc = document;
import loadHtml from './utils/loadHtml.js';

const modal = (userType) => {
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

    // open
    elModal.style = '';
    elModal.innerHTML = modalHtml;

    // listen for submit
    const formTwo = elModal.querySelector('#formTwo');
    formTwo.addEventListener('submit', handleSubmits);

    // close
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
        lastName: vals[2].lastName,
        country: vals[3].country,
      };
    }

    return dataStruct;
  }

  async function sendFormData(data) {
    const url = `http://localhost:1337/api/sign/waitlist/${userType}`;
    data.waitlistId = localStorage.getItem('waitlistId');
    const method = data.waitlistId ? 'PUT' : 'POST';

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
    console.log(payload);

    const msgSuccess = `We've just sent an email to your inbox.
                        Please click the link in the email to confirm your address.`;
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

    // render feedback
    elInfoContainer.style = '';
    elInfoContainer.className = bgColor;
    elInfo.style = '';
    elInfo.innerHTML = msg;

    return false;
  }
};

export default modal;
