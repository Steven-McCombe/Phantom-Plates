const deleteFoodBtns = document.querySelectorAll('.delete-icon')

async function deleteFood(id) {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm("Are you sure you want to delete this Item?")) {
      const response = await fetch(`/api/food/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };


  const handleFoodDelete = (event) => {
    event.stopPropagation();
    const foodId = event.target.getAttribute('value');
    deleteFood(foodId)
  };



for (let deleteFoodBtn of deleteFoodBtns) {
    deleteFoodBtn.addEventListener('click', handleFoodDelete);
  }