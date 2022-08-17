'use strict';
const doc = document;
import matrix from './matrix.js';

const toggleTheme = (showFooterVisual) => {
  const elsToggle = doc.querySelectorAll('.toggleTheme');
  const elRocket = doc.querySelector('.rocket');

  function toggleFooterVisual(t) {
    const elMatrix = doc.getElementById('matrix');
    elMatrix.style = t === 'dark' ? 'display: block;' : 'display: none;';
  }

  function changeTheme() {
    const currTheme = doc.documentElement.getAttribute('theme');
    const localTheme = localStorage.getItem('theme');

    const fromTheme = localTheme ? localTheme : currTheme;
    const toTheme = fromTheme === 'dark' ? 'light' : 'dark';

    elRocket.src = `../assets/tertle_rocket-${toTheme}-sm.gif`;
    doc.documentElement.setAttribute('theme', toTheme);
    localStorage.setItem('theme', toTheme);
    showFooterVisual && toggleFooterVisual(toTheme);
  }

  if (showFooterVisual) matrix();
  changeTheme();
  elsToggle.forEach((elToggle) => (elToggle.onclick = () => changeTheme()));
};

export default toggleTheme;
