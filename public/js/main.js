import { getFormInputs, submitData } from './utils.js';

// Urls
const signupSubmitUrl = '/signup-submit';
const emailSubmitUrl = '/email-submit';

console.log('something!');

const getEmail = () => {
    const email = document.querySelector('#signup-init input').value;
    submitData({ email: email }, emailSubmitUrl);
    return email;
};

// Submit initial email and open form
const modal = document.querySelector('.modal'); // --target modal
const signupInitBtn = document.querySelector('#signup-init .btn.btn-primary'); // --target btn
signupInitBtn.addEventListener('click', (e) => {
    document.getElementById('email').value = getEmail(); // --dispay initial email and submit
    if (modal.style.display === 'none') {
        modal.style.display = 'block';
    } 
    e.preventDefault();
});

// Close signup form
const closeModal = document.getElementById('close');
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Submit form
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', (submit) => {
    submit.preventDefault();
    const formData = getFormInputs();
    submitData(formData, signupSubmitUrl);
});

// NAV ----------------------------------------------

const header = document.getElementById('header');
const logo = document.getElementById('logo');
const navBtn = document.getElementById('nav-btn');
const navLink = document.querySelectorAll('nav a');


// Turns header/nav secondary CTA into primary CTA when scrolled
window.addEventListener('scroll', () => {
    if (!responsiveChanges()) {
        if (window.pageYOffset > 500) {
            navBtn.className='btn btn-primary';
        } else {
            navBtn.className= 'btn btn-secondary'; // add transition to all css
            }
    }
});
