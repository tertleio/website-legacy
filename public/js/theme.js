'use strict';
const doc = document;
import matrix from './matrix.js';

const toggleTheme = (showFooterVisual) => {
  const elsToggle = doc.querySelectorAll('.toggleTheme');
  const elRocket = doc.querySelector('.rocket');

  function updateFooter(theme) {
    const { protocol, origin } = window.location;
    // dev or prod env?
    const baseUrl = protocol === 'http:' ? origin + '/public' : origin;
    elRocket.src = `${baseUrl}/assets/tertle_rocket-${theme}-sm.gif`;

    if (!showFooterVisual) return;
    const elMatrix = doc.getElementById('matrix');
    elMatrix.style = theme === 'dark' ? 'display: block;' : 'display: none;';
  }

  function updateTheme() {
    const fromTheme = doc.documentElement.getAttribute('theme');
    const toTheme = fromTheme === 'dark' ? 'light' : 'dark';

    updateFooter(toTheme);
    doc.documentElement.setAttribute('theme', toTheme);
    localStorage.setItem('theme', toTheme);
  }

  function onMount() {
    // update to local theme if exists
    const localTheme = localStorage.getItem('theme');
    if (localTheme) doc.documentElement.setAttribute('theme', localTheme);

    // update rocket and footer
    const currTheme = doc.documentElement.getAttribute('theme');
    showFooterVisual && matrix();
    updateFooter(localTheme ? localTheme : currTheme);
  }

  // listen for user change
  elsToggle.forEach((elToggle) => {
    elToggle.onclick = () => updateTheme();
  });

  onMount();
};

export default toggleTheme;
