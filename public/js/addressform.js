

const addressFormHandler = async (event) => {
    event.preventDefault();
  
    const street = document.querySelector('#street').value.trim();
    const apt_no = document.querySelector('#apt_no').value.trim();
    const city = document.querySelector('#city').value.trim();
    const state = document.querySelector('#state').value.trim();
    const zip = document.querySelector('#zip').value.trim();
    const country = document.querySelector('#country').value.trim();
    
 
    if (street && apt_no && city && state && zip && country) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/address/', {
        method: 'POST',
        body: JSON.stringify({ street , apt_no , city , state , zip , country }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
          console.log(response)
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    } else {
        window.alert("Please ensure all fields are filled in.")
    }
  };

document
.querySelector('#saveButton')
.addEventListener('click', addressFormHandler);