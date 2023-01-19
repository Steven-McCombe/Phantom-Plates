

const profileFormHandler = async (event) => {
    event.preventDefault();
  
    const bio = document.querySelector('#bio').value.trim();
    const allergies = document.querySelector('#allergies').value.trim();
    const role = document.querySelector('#role').value
    const image_url = document.querySelector('#image_url').value
    
    if (bio) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/user/', {
        method: 'PUT',
        body: JSON.stringify({ bio, allergies, role, image_url }),
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
        window.alert("Please ensure the bio field is filled in.")
    }
  };

document
.querySelector('#saveProfileButton')
.addEventListener('click', profileFormHandler);