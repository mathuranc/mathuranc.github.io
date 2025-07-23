/* Declaring querySelectors */
const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declare source path for images */
let imageSourcePath = "./images/"

/* Declaring the array of image filenames */
const imageFileNames = [
    "pic1.jpg", 
    "pic2.jpg",
    "pic3.jpg",          
    "pic4.jpg", 
    "pic5.jpg"
]

/* Declaring the alternative text for each image file */
const imageAltText = {
    imageFileNames[0] : "Close-up of blue human eye",
    imageFileNames[1] : "Close-up of sedimentary rock formation",
    imageFileNames[2] : "Close-up of purple and white flowers",
    imageFileNames[3] : "Close-up of ancient Egyptian wall painting",
    imageFileNames[4] : "Close-up of brown butterfly"
}

/* Looping through images */
for (let imageSrc in imageAltText) {  
    // adds image(s) to thumb bar
    const newImage = document.createElement('img');
    newImage.setAttribute('src', imageSourcePath + imageSrc);
    newImage.setAttribute('alt', imageAltText.key);
    thumbBar.appendChild(newImage);

    // initialize event listener to change displayed image
    newImage.addEventListener('click', function() {
        displayedImage.setAttribute('src', this.src);
        displayedImage.setAttribute('alt', this.alt);
    });
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', function() {
    if (this.getAttribute('class') == "dark") {
        this.setAttribute('class', "light");
        this.textContent = "Lighten";
        overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
    }
    else if (btn.getAttribute('class') == "light") {
        this.setAttribute('class', "dark");
        this.textContent = "Darken";
        overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
    }
});