// initialize global variables
const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageFileNames = [
    "pic1.jpg", 
    "pic2.jpg",
    "pic3.jpg",          
    "pic4.jpg", 
    "pic5.jpg"
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

const newImage = document.createElement('img');
newImage.setAttribute('src', xxx);
newImage.setAttribute('alt', xxx);
thumbBar.appendChild(newImage);

/* Wiring up the Darken/Lighten button */
