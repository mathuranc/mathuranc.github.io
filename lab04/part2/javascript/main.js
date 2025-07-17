/* Declaring querySelectors */
const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageFileNames = [
    "./images/pic1.jpg", 
    "./images/pic2.jpg",
    "./images/pic3.jpg",          
    "./images/pic4.jpg", 
    "./images/pic5.jpg"
]

/* Declaring the alternative text for each image file */
const imageAltText = [
    "Close-up of blue human eye",
    "Close-up of sedimentary rock formation",
    "Close-up of purple and white flowers",
    "Close-up of ancient Egyptian wall painting",
    "Close-up of brown butterfly"
]

/* Looping through images */
for (let i = 0; i < imageFileNames.length; i++) {
    /**
     * Displays chosen image
     * @returns {void}
     */
    function changeDisplayedImage() {
        displayedImage.setAttribute('src', newImage.src);
        displayedImage.setAttribute('alt', newImage.alt);
    }   
    
    // adds image(s) to thumb bar
    const newImage = document.createElement('img');
    newImage.setAttribute('src', imageFileNames[i]);
    newImage.setAttribute('alt', imageAltText[i]);
    thumbBar.appendChild(newImage);

    // initialize event listener to change displayed image
    newImage.addEventListener('click', changeDisplayedImage);
}

/* Wiring up the Darken/Lighten button */
const LIGHT_MODE = "light";
const DARK_MODE = "dark";
/**
 * Adds/removes darken effect on displayed
 * @returns {void}
 */
function toggleOverlay() {
    if (btn.getAttribute('class') == DARK_MODE) {
        btn.setAttribute('class', LIGHT_MODE);
        btn.textContent = "Lighten";
        overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
    }
    else if (btn.getAttribute('class') == LIGHT_MODE) {
        btn.setAttribute('class', DARK_MODE);
        btn.textContent = "Darken";
        overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
    }
}

// initialize event listener to lighten/darken displayed image
btn.addEventListener('click', toggleOverlay);