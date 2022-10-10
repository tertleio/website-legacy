'use strict';
const doc = document;
import matrix from './matrix.js';

const toggleTheme = (showFooterVisual) => {
  const elsToggle = doc.querySelectorAll('.toggleTheme');
  const elRocket = doc.querySelector('.rocket');
  // get all image srcs from demo
  // rewrite all src's to selected theme

  function updateFeatures(theme) {
    const elsFeature = doc.querySelectorAll('.demo img');

    elsFeature.forEach((el, i) => {
      if (i === elsFeature.length - 1) return;
      el.src = `/assets/feature${i + 1}-${theme}.png`;
    });
  }

  function updateFooter(theme) {
    elRocket.src = `/assets/tertle_rocket-${theme}-sm.gif`;

    if (!showFooterVisual) return;
    const elMatrix = doc.getElementById('matrix');
    elMatrix.style = theme === 'dark' ? 'display: block;' : 'display: none;';
  }

  function updateTheme() {
    const fromTheme = doc.documentElement.getAttribute('theme');
    const toTheme = fromTheme === 'dark' ? 'light' : 'dark';

    updateFooter(toTheme);
    updateFeatures(toTheme);
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
    updateFeatures(localTheme ? localTheme : currTheme);
  }

  // listen for user change
  elsToggle.forEach((elToggle) => {
    elToggle.onclick = () => updateTheme();
  });

  onMount();
};

export default toggleTheme;
