const modal = document.getElementById('announcement-modal');
const modalContent = document.getElementById('modal-content-container');

const openModal = () => {
    // Show the backdrop
    modal.classList.remove('hidden');
    
    // Use a slight delay to trigger the CSS transition for content
    setTimeout(() => {
        modal.classList.add('opacity-100');
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10); 
};

const closeModal = () => {
    // Reverse the content transition
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    
    // Hide the backdrop after the content transition finishes (300ms)
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('opacity-100');
    }, 300); 
};

// Trigger modal on page load after a 1-second delay for better user experience
window.addEventListener('load', () => {
    setTimeout(openModal, 1000); 
});

// Close modal when clicking outside the content (on the backdrop)
modal.addEventListener('click', (e) => {
    if (e.target.id === 'announcement-modal') {
        closeModal();
    }
});


document.addEventListener('DOMContentLoaded', () => {
const track = document.querySelector('.slider-track');
const slides = Array.from(document.querySelectorAll('.slide'));
const nextButton = document.querySelector('.next-button');
const prevButton = document.querySelector('.prev-button');
const dotsContainer = document.querySelector('.slider-dots');
const dots = Array.from(document.querySelectorAll('.dot'));

// Configuration
const logosPerView = 4; // Number of logos visible at once
const totalLogos = slides.length;
// The number of steps you can take. This should correspond to the number of dots.
// Math.ceil is the correct approach here.
const maxSteps = Math.ceil(totalLogos / logosPerView); 
let currentStep = 0;

// Function to move the slider
const moveSlider = (step) => {
    // Ensure the step is within bounds
    if (step < 0) {
        currentStep = maxSteps - 1; // Loop back to the end
    } else if (step >= maxSteps) {
        currentStep = 0; // Loop back to the start
    } else {
        currentStep = step;
    }

    // Calculate the translation distance. 
    // The track contains ALL slides. We move a portion equal to the logosPerView relative to the total number of slides.
    // Example: 4 logos, 4 slides. totalLogos / logosPerView = 1. Moving 100/1 * 0% = 0%.
    // Example: 8 logos, 4 logos per view. maxSteps = 2. Step 1 moves -1 * (100 / 2) = -50%
    // The original logic was actually correct for the 'maxSteps' count.
    const translateValue = -(currentStep * (100 / maxSteps)); 
    track.style.transform = `translateX(${translateValue}%)`;

    updateDots();
};

// Function to update the active dot
const updateDots = () => {
    dots.forEach(dot => dot.classList.remove('active'));
    // FIX 4: Simplified and ensured correct dot is activated based on the current step.
    if (dots[currentStep]) {
        dots[currentStep].classList.add('active');
    }
};

// Event Listeners for Buttons
nextButton.addEventListener('click', () => {
    moveSlider(currentStep + 1);
});

prevButton.addEventListener('click', () => {
    moveSlider(currentStep - 1);
});

// Event Listeners for Dots
dotsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('dot')) {
        const slideIndex = parseInt(e.target.getAttribute('data-slide'));
        moveSlider(slideIndex);
    }
});

// Initial state setup
updateDots();
});
