
// function to delete a blog based on id selected 
async function handleAddressDelete() {
    event.preventDefault();
    event.stopPropagation();
// alert the user to see if they really want to delete.
    if (window.confirm("Are you sure you want to delete this address?")) {
      const response = await fetch(`/api/address/`, {
        method: 'DELETE',
        body: JSON.stringify({
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        location.reload();
      } else {
        alert(response.statusText);
      }
    }
};
  
const deleteAddressBtn = document.querySelector("#deleteAddress")

deleteAddressBtn.addEventListener('click', handleAddressDelete);
