// import { getInputs } from './utils.js';

// API
const signupSubmitUrl = '/signup-submit'
const emailSubmitUrl = '/email-submit'

// DOMS - Get form values and return object
const getFormInputs = () => {
// DOMS - Signup form
    const email = document.getElementById('email').value;
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const postcode = document.getElementById('postcode').value;
    const skillset = document.getElementById('skillset').value;
    const lookingFor = document.getElementById('looking_for').value;
    
    return {
        firstName: firstName, 
        lastName: lastName,
        postcode: postcode,
        skillset: skillset,
        lookingFor: lookingFor
    }
};

// Post Submit
const submitData = async (data, url) => {
    try {
        const response = await fetch(url, { 
            method: 'POST', 
            headers: {'Content-type': 'application/json' },
            body: JSON.stringify(data) 
        })
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        }
    } catch (err) {
        console.log(err);
    }
};

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

// Submit form (0. form validation)
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', async (submit) => {
    submit.preventDefault();
    const formData = getFormInputs();
    submitData(formData, signupSubmitUrl);
});