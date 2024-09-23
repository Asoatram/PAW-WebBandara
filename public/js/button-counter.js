
    const counter = document.getElementById('counter');
    const incrementBtn = document.getElementById('increment-btn');
    const decrementBtn = document.getElementById('decrement-btn');

// Convert the counter to a number initially
    let count = parseInt(counter.textContent);

// Function to increment the number
    incrementBtn.addEventListener('click', () => {
        count += 1;
        counter.textContent = count; // Update the displayed value
    });

// Function to decrement the number
    decrementBtn.addEventListener('click', () => {
        if (count > 1) { // Prevent going below 1
            count -= 1;
            counter.textContent = count;
        }
    });

