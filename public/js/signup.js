const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  console.log(email)
  console.log(password)
  console.log(name)

    if (name && email && password) {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };
//Redirects to the login form when login is clicked
  const loginFormHandler = (event) => {
    document.location.replace('login')
  }
  
  document
    .querySelector('#button-login')
    .addEventListener('click', loginFormHandler);
  
  document
    .querySelector('#button-signup')
    .addEventListener('click', signupFormHandler);