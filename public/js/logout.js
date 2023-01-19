// function to logout and return user to the home page 
const logout = async () => {
    const response = await fetch('/api/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
       document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  // find the logout button by id 
  document.querySelector('#navbutton-logout').addEventListener('click', logout);