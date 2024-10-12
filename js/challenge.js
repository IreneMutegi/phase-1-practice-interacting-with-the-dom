let count = 0;
let likes = {};
let timer;
let isPaused = false;

// DOM Elements
const counterElement = document.getElementById('counter');
const likesList = document.querySelector('.likes');
const pauseButton = document.getElementById('pause');
const commentInput = document.getElementById('comment-input');
const commentForm = document.getElementById('comment-form');
const commentList = document.getElementById('list');

// Function to update the counter display
function updateCounter() {
    if (!isPaused) {
        count++;
        counterElement.textContent = count;
    }
}

// Start the timer
function startTimer() {
    timer = setInterval(updateCounter, 1000);
}

// Pause the counter
function pauseCounter() {
    clearInterval(timer);
    isPaused = true;
    pauseButton.textContent = 'Resume';
    toggleButtons(false);
}

// Resume the counter
function resumeCounter() {
    startTimer();
    isPaused = false;
    pauseButton.textContent = 'Pause';
    toggleButtons(true);
}

// Toggle button states
function toggleButtons(enable) {
    document.getElementById('plus').disabled = !enable;
    document.getElementById('minus').disabled = !enable;
    document.getElementById('heart').disabled = !enable;
}

// Function to handle likes
function handleLike() {
    if (likes[count]) {
        likes[count]++;
    } else {
        likes[count] = 1;
    }

    // Update the likes display
    likesList.innerHTML = ''; // Clear previous likes display
    for (const [key, value] of Object.entries(likes)) {
        likesList.innerHTML += `<li>${key} has ${value} likes</li>`;
    }
}

// Event Listeners
document.getElementById('plus').addEventListener('click', () => {
    count++;
    counterElement.textContent = count;
});

document.getElementById('minus').addEventListener('click', () => {
    if (count > 0) {
        count--;
        counterElement.textContent = count;
    }
});

document.getElementById('heart').addEventListener('click', handleLike);

pauseButton.addEventListener('click', () => {
    if (isPaused) {
        resumeCounter();
    } else {
        pauseCounter();
    }
});

// Comment submission
commentForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    const comment = commentInput.value.trim();
    if (comment) {
        const div = document.createElement('div');
        div.textContent = comment;
        commentList.appendChild(div);
        commentInput.value = ''; // Clear input field
    }
});

// Start the timer on page load
window.onload = startTimer;
