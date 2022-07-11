// DOM
const header = document.getElementById('header');
const logo = document.getElementById('logo');
const navBtn = document.getElementById('nav-btn');
const navLink = document.querySelectorAll('nav a');

const nav = () => {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500 && header.className == 'wrapper') {
      navBtn.className = 'btn btn--primary';
    } else {
      navBtn.className = 'btn btn--secondary';
    }
  });
};

export default nav;
