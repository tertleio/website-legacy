// GET DOM
const email = document.getElementById('email');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const postcode = document.getElementById('postcode');
const skillset = document.getElementById('skillset');
const lookingFor = document.getElementById('looking-for');
const linkedin = document.getElementById('linkedin');

email.className = 'field valid';

const onFocus = (field) => {
    const fieldState = field.className = 'field focused';
    console.log(field);
    return fieldState;
};

const validation = (field) => {
    if (field.value == '') {
        field.className = 'field invalid';
    } else if (!field.value == '') {
        field.className = 'field valid';
    }
};


email.addEventListener('focus', (e) => {onFocus(email)});
firstName.addEventListener('focus', (e) => {onFocus(firstName)});
lastName.addEventListener('focus', (e) => {onFocus(lastName)});
postcode.addEventListener('focus', (e) => {onFocus(postcode)});
skillset.addEventListener('focus', (e) => {onFocus(skillset)});
lookingFor.addEventListener('focus', (e) => {onFocus(lookingFor)});
linkedin.addEventListener('focus', (e) => {onFocus(linkedin)});

email.addEventListener('blur', (e) => {validation(email)});
firstName.addEventListener('blur', (e) => {validation(firstName)});
lastName.addEventListener('blur', (e) => {validation(lastName)});
postcode.addEventListener('blur', (e) => {validation(postcode)});
skillset.addEventListener('blur', (e) => {validation(skillset)});
lookingFor.addEventListener('blur', (e) => {validation(lookingFor)});
linkedin.addEventListener('blur', (e) => {validation(linkedin)});


// validate function
console.log(lookingFor);