'use strict';
const doc = document;
import matrix from './matrix.js';

const toggleTheme = (showFooterVisual) => {
  const elsToggle = doc.querySelectorAll('.toggleTheme');
  const elRocket = doc.querySelector('.rocket');
  // get all image srcs from demo
  // rewrite all src's to selected theme

  function updateFeatures(theme) {
    const elsFeatureDt = doc.querySelectorAll('.demo__dt img');
    const elsFeatureMb = doc.querySelectorAll('.demo__mb img');

    elsFeatureDt.forEach(
      (el, i) => (el.src = `/assets/feature${i + 1}-${theme}.png`)
    );

    elsFeatureMb.forEach(
      (el, i) => (el.src = `/assets/feature${i + 1}-${theme}.png`)
    );
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
    // update global colors to  local theme if exists
    const localTheme = localStorage.getItem('theme');
    if (localTheme) doc.documentElement.setAttribute('theme', localTheme);

    // getters
    const currTheme = doc.documentElement.getAttribute('theme');
    const toTheme = localTheme ? localTheme : currTheme;

    // setters
    showFooterVisual && matrix();
    updateFooter(toTheme);
    updateFeatures(toTheme);
  }

  // listen for user change
  elsToggle.forEach((elToggle) => {
    elToggle.onclick = () => updateTheme();
  });

  onMount();
};

export default toggleTheme;
