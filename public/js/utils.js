const getInputs = () => {
    const signupForm = document.getElementById('signup-form');
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

export { getInputs };