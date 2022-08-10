import loadHtml from './utils/loadHtml.js';

async function toggleModal() {
  const modalHtml = await loadHtml('../components/modal.html', import.meta.url);
  const elModal = document.querySelector('#overlay-modal');
  // Open
  elModal.style = '';
  elModal.innerHTML = modalHtml;

  const elCloseBtn = document.querySelector('.modal-close');
  // Close
  elCloseBtn.addEventListener(
    'click',
    () => {
      elModal.style.display = 'none';
    },
    { once: true }
  );
}

async function submit(e) {
  e.preventDefault();
  toggleModal();
}

const ctrler = () => {
  const elSign = document.querySelector('.signup');
  elSign.addEventListener('click', submit);
};

export default ctrler;
