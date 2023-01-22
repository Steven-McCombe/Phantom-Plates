
// function to delete a kitchen based on user_id selected 
async function handleKitchenDelete() {
    event.preventDefault();
    event.stopPropagation();
// alert the user to see if they really want to delete.
    if (window.confirm("Are you certain that you wish to permanently delete your kitchen and all related data, including reviews, foods, and comments?")) {
      const response = await fetch(`/api/kitchen/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    }
};
  
const deleteKitchenBtn = document.querySelector("#deleteKitchen")

deleteKitchenBtn.addEventListener('click', handleKitchenDelete);
