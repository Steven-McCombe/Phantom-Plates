
// function to delete a blog based on id selected 
async function handleUserDelete() {
    event.preventDefault();
    event.stopPropagation();
// alert the user to see if they really want to delete.
    if (window.confirm("Are you certain that you wish to permanently terminate your account and all related data, including kitchens, reviews, and comments?")) {
      const response = await fetch(`/api/user/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert(response.statusText);
      }
    }
};
  
const deleteAddressBtn = document.querySelector("#deleteUser")

deleteAddressBtn.addEventListener('click', handleUserDelete);
