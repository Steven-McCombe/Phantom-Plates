
const kitchenFormHandler = async (event) => {
    event.preventDefault();

    const kitchen_name = document.querySelector('#kitchen_name').value.trim();
    const location = document.querySelector('#location').value.trim();
    const neighborhood = document.querySelector('#neighborhood').value.trim();
    const description = document.querySelector('#description').value.trim();
    const cuisine = document.querySelector('#cuisine').value.trim();
    const delivery_radius = document.querySelector('#delivery_radius').value.trim();
    const delivery_time = document.querySelector('#delivery_time').value.trim();
    const image_url = document.querySelector('#image_url').value.trim();
    const available = true


    if (kitchen_name && location && neighborhood && description && cuisine && delivery_radius && delivery_time && image_url) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/kitchen/', {
            method: 'POST',
            body: JSON.stringify({kitchen_name, location, neighborhood, description, cuisine, delivery_radius, delivery_time, image_url, available }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            console.log(response)
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    } else {
        window.alert("Please ensure all fields are filled in.")
    }
};

document
    .querySelector('#saveButton')
    .addEventListener('click', kitchenFormHandler);