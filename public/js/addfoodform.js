const foodFormHandler = async (event) => {
    event.preventDefault();
    const kitchen_id = document.querySelector('#kitchenId').innerHTML;
    const food_name = document.querySelector('#food_name').value.trim();
    const description = document.querySelector('#description').value.trim();
    const ingredients = document.querySelector('#ingredients').value.trim();
    const price = document.querySelector('#price').value.trim();
    const image_url = document.querySelector('#image_url').value.trim();
    
console.log(kitchen_id)
console.log(food_name)
console.log(description)
console.log(ingredients)
console.log(price)
console.log(image_url)

    if (food_name && description && ingredients && price && image_url) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/food/', {
            method: 'POST',
            body: JSON.stringify({ kitchen_id, food_name, description, ingredients, price, image_url, }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            console.log(response)
            // document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    } else {
        window.alert("Please ensure all fields are filled in.")
    }
};

document
    .querySelector('#saveButton')
    .addEventListener('click', foodFormHandler);