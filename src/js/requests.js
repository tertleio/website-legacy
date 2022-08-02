// DOMS - Get form values and return object
const getFormInputs = () => {
        const email = document.getElementById('email').value;
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const postcode = document.getElementById('postcode').value;
        const linkedin = document.getElementById('linkedin').value;
        
        let skillset = document.getElementById('skillset').value;
        let lookingFor = document.getElementById('looking-for').value;
        let lookingForOther = document.getElementById('looking-for-other').value;
        let skillsetOther = document.getElementById('skillset-other').value;
        
        if (skillsetOther.length > 0) skillset = skillsetOther;
        if (lookingForOther.length > 0) lookingFor = lookingForOther;
        
        return {
            email: email,
            firstName: firstName,
            lastName: lastName,
            postcode: postcode,
            skillset: skillset,
            lookingFor: lookingFor,
            linkedin: linkedin
        }
    };
// Post something
const submitData = async (data, url) => {
    try {
        const response = await fetch(url, { 
            method: 'POST', 
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            return response;
        } else {
            return response.status
        }
    } catch (err) {
        console.log(err);
    }
};


export { getFormInputs, submitData };