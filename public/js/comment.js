

const urlId = document.URL.split('/')
const commentSubmit = async (event) => {
    event.preventDefault();

    const comment_body = document.querySelector('#newComment').value.trim();
    const kitchen_id = urlId.at(-1)
    const rating = document.querySelector('#rating').value;

    console.log(comment_body);
    console.log(kitchen_id);
    console.log(rating);

    if (comment_body && kitchen_id && rating) {
        const response = await fetch('/api/comment/', {
            method: 'POST',
            body: JSON.stringify({ comment_body, kitchen_id, rating }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            console.log(response)
            location.reload();
        } else {
            alert(response.statusText);
        }
    } else {
        window.alert("Please ensure all fields are filled in.")
    }
};

document
    .querySelector('#buttonSubmit')
    .addEventListener('click', commentSubmit);
// I need:  Kitchen ID, Comment Body 