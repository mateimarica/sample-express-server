const dynamicImageSlider = document.querySelector('#dynamicImageSlider');
const dynamicImage = document.querySelector('#dynamicImage');

// Register an event listener
dynamicImageSlider.addEventListener('input', function() {
	dynamicImage.src = `/get_image?number=${this.value}`; // Change the image src based on the slider's HTML value
});

// Trigger the input event on page load
dynamicImageSlider.dispatchEvent(new Event('input'));