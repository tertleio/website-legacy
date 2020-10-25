// import { getInputs } from './utils.js';

// Links
const url = '/signup-submit'

// DOMS - Initial email
const getInputs = () => {
// DOMS - Signup form
    const emailInit = signupInit.querySelector('.text-field').value;
    const email = document.getElementById('email').value;
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const postcode = document.getElementById('postcode').value;
    const skillset = document.getElementById('skillset').value;
    const lookingFor = document.getElementById('looking_for').value;
    
    return {
        email: email, 
        firstName: firstName, 
        lastName: lastName,
        postcode: postcode,
        skillset: skillset,
        lookingFor: lookingFor
    }
};

const getEmail = () => {
    const emailInit = signupInit.querySelector('.text-field').value;
    return emailInit;
};

// Open signup form
const modal = document.querySelector('.modal'); // --get dom
const signupInit = document.getElementById('signup-init');
const signupInitBtn = signupInit.querySelector('.btn.btn-primary');
signupInitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('email').value = getEmail();

    if (modal.style.display === 'none') {
        modal.style.display = 'block';
    } // 
});

// Close signup form and submit email only
const closeModal = document.getElementById('close');
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    // 0. if they close the window without submitting, send request to store email
    // 0. Backend: if already registered - do not save
});

// Submit form (0. form validation)
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', async (submit) => {
    submit.preventDefault();
    const sendData = getInputs();
    try {
        const response = await fetch(url, { 
            method: 'POST', 
            headers: {'Content-type': 'applicaion/json'},
            body: JSON.stringify(sendData) 
        })
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        }
    } catch (err) {
        console.log(err)
    }
});