'use strict';
const doc = document;

function toggleFooter() {
  const elMatrix = doc.getElementById('matrix');
  elMatrix.style = theme === 'dark' ? 'display: block;' : 'display: none;';
}

const toggleTheme = () => {
  const elsToggle = doc.querySelectorAll('.toggleTheme');
  const elRocket = doc.querySelector('.rocket');

  function changeTheme(theme) {
    elRocket.src = `../assets/tertle_rocket-${theme}-sm.gif`;
    doc.documentElement.setAttribute('theme', theme);
    localStorage.setItem('theme', theme);
  }

  const localTheme = localStorage.getItem('theme');
  if (localTheme) changeTheme(localTheme);

  elsToggle.forEach((elToggle) => {
    elToggle.onclick = () => {
      const fromTheme = doc.documentElement.getAttribute('theme');
      const toTheme = fromTheme === 'dark' ? 'light' : 'dark';

      changeTheme(toTheme);
    };
  });
};

export default toggleTheme;
