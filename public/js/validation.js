// Data
const msg = {
    valueMissing: 'This is a valid field'
}

// Check Valid
const checkValid = (fieldValue) => {
    if (fieldValue == '') {
        return 'field invalid';
    }  else if (!fieldValue == '') {
        return 'field valid';
    }
};

// Listen & Render
let fields = document.querySelectorAll('input, select, textarea');
fields. forEach((field) => {
       field.addEventListener('focus', () => {
        field.className = 'field focused';
       })
         field.addEventListener('blur', () => {
            field.className = checkValid(field.value);
            // render custom message here
        });
    });