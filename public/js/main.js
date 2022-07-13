'use strict';
const doc = document;

const navCta = document.getElementById('nav-cta');
const overlay = document.getElementById('overlay');

doc.addEventListener('DOMContentLoaded', () => {
  const chosenTheme = localStorage.getItem('theme');
  if (chosenTheme) doc.documentElement.setAttribute('theme', chosenTheme);

  const toggle = doc.getElementById('toggle-theme');
  console.log(toggle);
  toggle.onclick = () => {
    const currentTheme = doc.documentElement.getAttribute('theme');
    const updateTheme = currentTheme === 'dark' ? 'light' : 'dark';
    doc.documentElement.setAttribute('theme', updateTheme);
    localStorage.setItem('theme', updateTheme);
  };
});

function onScroll() {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      navCta.className = 'btn btn--primary';
      overlay.style['animation-name'] = 'hide-rabbit';
    } else {
      navCta.className = 'btn btn--secondary';
      overlay.style['animation-name'] = 'show-rabbit';
    }
  });
}

onScroll();

// URLS ---------------------------------------------------------
// const signupSubmitUrl = '/signup-submit';
// const emailSubmitUrl = '/email-submit';

// DOMS
// const modal = document.querySelector('.modal');
// const emailCta = document.querySelectorAll('.signup-init');

// EMAIL  ---------------------------------------------------------
// Validate & Submit Email
// const submitEmail = async (emailVal) => {
//   if (emailVal == '' || emailVal.indexOf('@') == -1) {
//     alert('Please enter a valid email');
//   } else {
//     const response = await submitData({ email: emailVal }, emailSubmitUrl); // --post email
//     if (response.ok) {
//       document.getElementById('email').value = emailVal; // --dispay initial email on form
//       openModal(emailVal);
//     } else {
//       if (response === 409) {
//         alert('Looks like this email has already been registered.');
//       } else {
//         alert('Sorry, looks like there was a probem on our end.');
//       }
//     }
//   }
// };

// Email Submit Listeners
// emailCta.forEach((i) => {
//   i.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const inputVal = i.querySelector('input').value;
//     submitEmail(inputVal);
//   });
// });

// // Open modal
// const email = document.getElementById('email');
// const body = document.getElementsByTagName('body')[0];
// const openModal = (inputValue) => {
//   body.className = 'modal-open';
//   email.value = inputValue;
//   modal.style.display = 'block';
// };

// // Close modal
// const closeModal = document.getElementById('close-modal'); // Open
// closeModal.addEventListener('click', (e) => {
//   body.className = '';
//   modal.style.display = 'none';
// });

// // Nav signup button expand
// const ctaNav = document.getElementById('nav-btn'); // --select nav btn
// ctaNav.addEventListener('click', (e) => {
//   ctaNav.style.display = 'none';
//   document.getElementById('nav-init').style = 'display: block;';
//   if (window.innerWidth < 700) {
//     document.getElementById('logo').style = 'display: none;';
//   }
// });

// FORM ----------------------------------------------------------
// Select ->  Other field
// const selectFields = document.querySelectorAll('select'); // --get doms (!) cleanup

// const skillsetWrapper = document.getElementById('skillset-wrapper'); // --skillset
// const newDiv = document.querySelector('.flex-item.other');
// const newField = document.getElementById('skillset-other');

// const lookingForWrapper = document.getElementById('lookingfor-wrapper'); // --looking for
// const newDiv2 = document.querySelector('.flex-item.other.two');
// const newField2 = document.getElementById('looking-for-other');

// selectFields.forEach((selectField) => {
//   selectField.addEventListener('change', (e) => {
//     if (selectField.value == 'Other skillset') {
//       skillsetWrapper.className = 'flex-row';
//       document.getElementById('looking-for-other').value = '';
//       newDiv.style = 'display: block';
//       newField.focus();
//     } else if (selectField.value == 'Looking for other') {
//       lookingForWrapper.className = 'flex-row';
//       document.getElementById('looking-for-other').value = '';
//       newDiv2.style = 'display: block';
//       newField2.focus();
//     } else if (
//       selectField.value !== 'Other skillset' &&
//       selectField.name == 'looking-for'
//     ) {
//       lookingForWrapper.className = 'flex-col';
//       newDiv2.firstElementChild.className = 'field inactive'; // --checkAllValid chekcs if this class is active or not / do better
//       newDiv2.style = 'display: none';
//     } else {
//       skillsetWrapper.className = 'flex-col';
//       document.getElementById('skillset-other').value = '';
//       newDiv.firstElementChild.className = 'field inactive';
//       newDiv.style = 'display: none'; // (!) inject 'other field?
//     }
//   });
// });

// // Check All Valid & Submit Form
// const signupForm = document.getElementById('signup-form');
// const renderFeedback = document.querySelector('.validation-feedback');
// signupForm.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   if (checkAllValid(signupForm) > 0) {
//     renderFeedback.style = 'opacity: 1';
//   } else {
//     renderFeedback.style = 'color: orange';
//     renderFeedback.innerHTML = 'Sending... :|`';
//     const response = await submitData(getFormInputs(), signupSubmitUrl);
//     if (response.ok) {
//       renderFeedback.style = 'display: none';
//       document.getElementById('modal-footer').style = 'display: none;';
//       document.getElementById('signup-body').style = 'display: none;';
//       signupForm.firstElementChild.firstElementChild.innerHTML =
//         "Thanks! We got it. We'll be sending out periodic invitations very soon.";
//       // signupForm.firstElementChild.firstElementChild. = 'Sweet! We got it. We\'ll let you know when we\'re ready to ship.'
//     } else {
//       renderFeedback.style = 'color: red';
//       renderFeedback.innerHTML =
//         'Darn :( There was a problem on our end... Give it another shot.`';
//     }
//   }
// });
