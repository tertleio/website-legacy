import loadHtml from './utils/loadHtml.js';

async function openModal() {
  const modalHtml = await loadHtml('../components/modal.html', import.meta.url);
  const elModal = document.querySelector('#modal');
  console.log('elModal', elModal);
  console.log(modalHtml);

  elModal.innerHTML = modalHtml;
}

async function submit(e) {
  e.preventDefault();
  console.log('submitted email');
  openModal();
}

const ctrler = () => {
  const elSign = document.querySelector('.signup');
  elSign.addEventListener('submit', submit);
  openModal();
};

export default ctrler;
