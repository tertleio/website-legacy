// CHECK INDIVUDAL VALID
const checkValid = (fieldValue) => {
    if (fieldValue == '') {
        return 'field invalid';
    }  else if (!fieldValue == '') {
        return 'field valid'; // -- returns css class names
    };
};


// Live field validation feedback 
let fields = document.querySelectorAll('input, select, textarea');
fields[0].className = 'field valid'; // --form email validated from initial email input
fields.forEach((field) => {
    if (field.className !== 'field2') { // (!) Targetting field style 2 - do this better
        field.addEventListener('focus', () => {
           if (field.id !== 'linkedin') {
            field.className = 'field focused';
            
           } else {
            field.value ='https://linkedin.com/in/';
           }
       })
         field.addEventListener('blur', () => {
            if (field.id !== 'linkedin'){
            field.className = checkValid(field.value);
            } else if (field.value == 'https://linkedin.com/in/' || '') {
                field.value = '';
            } else {
                field.className = 'field valid';
            }   
        });
    }
    });     


// CHECK ALL FIELDS ARE VALID
const checkAllValid = (form) => {
     const formVar = form.querySelectorAll('input, select, textarea');
     let invalidCount = 0;
     
     formVar.forEach(i => {
        // (!) do this better - needs to be compatible with  'other fields ->  active
        if ((i.value == '' || i.value == 'undefined') && i.className !== 'field inactive' && i.id !== 'linkedin')  {
            console.log(i);
            invalidCount++
        }

        // if the other fields are not active
     });
    return invalidCount;
};

export { checkAllValid };