const toggleTheme = () => {
  const elsToggle = doc.querySelectorAll('#toggle-theme');
  const elRocket = doc.querySelector('.rocket');
  const elMatrix = doc.getElementById('matrix');

  function changeTheme(theme) {
    elRocket.src = `./assets/tertle_rocket-${theme}-sm.gif`;
    doc.documentElement.setAttribute('theme', theme);
    elMatrix.style = theme === 'dark' ? 'display: block;' : 'display: none;';
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
