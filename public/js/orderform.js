// function to decrement the value of the target element
function decrement(e) {
    // Select the button with data-action attribute equals to "decrement"
    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    // Select the target element (input field)
    const target = btn.nextElementSibling;
    // Get the current value of the target element
    let value = Number(target.value);
    // Decrement the value by 1
    value--;
    // Update the value of the target element
    target.value = value;
  }

// function to increment the value of the target element
  function increment(e) {
    // Select the button with data-action attribute equals to "decrement"
    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    // Select the target element (input field)
    const target = btn.nextElementSibling;
    // Get the current value of the target element
    let value = Number(target.value);
    // Increment the value by 1
    value++;
    // Update the value of the target element
    target.value = value;
  }
 // Select all buttons with data-action attribute equals to "decrement"
  const decrementButtons = document.querySelectorAll(
    `button[data-action="decrement"]`
  );
 // Select all buttons with data-action attribute equals to "increment"
  const incrementButtons = document.querySelectorAll(
    `button[data-action="increment"]`
  );

  decrementButtons.forEach(btn => {
    btn.addEventListener("click", decrement);
  });

  incrementButtons.forEach(btn => {
    btn.addEventListener("click", increment);
  });