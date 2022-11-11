'use strict';
const doc = document;

function render(vars) {
  const elsH2 = doc.querySelectorAll('h2');
  const elMenu = doc.getElementById('menu-content');

  // hide content menu if none
  if (elsH2.length < 2) {
    const elMenuContentRoot = doc.getElementById('menu-content-root');
    return (elMenuContentRoot.style.display = 'none');
  }

  elsH2.forEach((h2, i) => {
    // content menu
    if (i === 0) return; // skip first h2 ('Top of Page' set by default)

    const hashTag = '#' + h2.innerText.split(' ').join('-').toLowerCase();
    const h2D = h2.dataset;
    const newLi = `
                  <li class="closeOnE">
                    <a 
                      href="${hashTag}" 
                      data-short="${h2D.short}"
                      data-long="${h2D.long}"
                      >
                      <span>${h2D.emoji}</span>${h2D.long}
                    </a>
                  </li>`;

    elMenu.innerHTML += newLi;
  });

  // active product menu
  if (vars.idx) {
    const elProductMenu = doc.getElementById('menu-products');
    const elBurgerMenu = doc.querySelector('.menu-burger');
    const elProductMenuA = elProductMenu.querySelector(
      `li:nth-of-type(${vars.idx}) a`
    );
    const elBurgerMenuA = elBurgerMenu.querySelector(
      `li:nth-of-type(${vars.idx + 1}) a`
    );
    elProductMenuA.classList.add('--active');
    elBurgerMenuA.classList.add('--active');
  }

  // TODO:
  // Footer Image
}

const compose = (vars) => render(vars);

export default compose;
