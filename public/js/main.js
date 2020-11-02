import { getFormInputs, submitData, getEmail } from './requests.js';
import { checkAllValid } from './validation.js';

// URLS -------------------
const signupSubmitUrl = '/signup-submit';
const emailSubmitUrl = '/email-submit';

// MODAL ------------
const modal = document.querySelector('.modal');
const signupInitBtn = document.querySelector('#signup-init .btn.btn-primary'); 
// Open
signupInitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('email').value = getEmail(); // --dispay initial email and submit

    if (modal.style.display === 'none') {
        modal.style.display = 'block';
    }

    const scrollY = document.body.style.top; // --prevent backdrop page scroll
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.position = 'fixed'; 
    // Close
}); const closeModal = document.getElementById('close-modal'); // Open
        closeModal.addEventListener('click', (e) => {
        modal.style.display = 'none';
    
        const scrollY = document.body.style.top; // --return to  previous position on page
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        e.preventDefault();
        
    }); 



// Select ->  Other field
const selectFields = document.querySelectorAll('select');  // --get doms (!) cleanup

const skillsetWrapper = document.getElementById('skillset-wrapper'); // --skillset
const newDiv = document.querySelector('.flex-item.other')
const newField = document.getElementById('skillset-other');

const lookingForWrapper = document.getElementById('lookingfor-wrapper'); // --looking for
const newDiv2 = document.querySelector('.flex-item.other.two')
const newField2 = document.getElementById('looking-for-other');

selectFields.forEach(selectField => {
    selectField.addEventListener('change', (e) => {
        if (selectField.value == 'Other skillset') {
            skillsetWrapper.className = 'flex-row';
            newDiv.style = 'display: block';
            newField.focus();
        } else if (selectField.value == 'Looking for other') {
            lookingForWrapper.className = 'flex-row';
            newDiv2.style = 'display: block';
            newField2.focus();
        } else if (selectField.value !== 'Other skillset' && selectField.name == 'looking-for' ){
            lookingForWrapper.className = 'flex-col';
            newDiv2.firstElementChild.className = 'field inactive'; // --checkAllValid chekcs if this class is active or not / do better
            newDiv2.style = 'display: none';
        } else {
            skillsetWrapper.className = 'flex-col';
            newDiv.firstElementChild.className = 'field inactive';
            newDiv.style = 'display: none'; // (!) inject 'other field?
        }
    }); 
})

// Form
// 0. Chek fields are valid
// 0. Submit data or Display error
const signupForm = document.getElementById('signup-form');
const renderFeedback = document.querySelector('.validation-feedback');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (checkAllValid(signupForm) > 0) {
        renderFeedback.style = 'opacity: 1';
    } else {
        renderFeedback.style = 'color: green';
        renderFeedback.innerHTML = 'Success!';
        console.log('submit data here');
    }
});
