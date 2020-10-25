// DOMS - Get form values and return object
const getFormInputs = () => {
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
    
    // Post something
    const submitData = async (data, url) => {
        try {
            const response = await fetch(url, { 
                method: 'POST', 
                headers: {'Content-type': 'application/json' },
                body: JSON.stringify(data) 
            })
            if (response.ok) {
                const jsonResponse = await response.json();
                return console.log('Submission successful');
                
            }
        } catch (err) {
            console.log(err);
        }
    };
    

export { getFormInputs, submitData };