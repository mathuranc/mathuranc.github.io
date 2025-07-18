// DOM elements
const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

// returns random element from array
function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

// story template and content options
let storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:," +
                "they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was" + 
                " not surprised — :insertx: weighs 300 pounds, and it was a hot day.";
let insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
let insertY = ["the soup kitchen", "Disneyland", "the White House"];
let insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];

// generate story on button click
randomize.addEventListener('click', result);

function result() {
  let newStory = storyText;

  // insert random story elements
  let xItem = randomValueFromArray(insertX);
  let yItem = randomValueFromArray(insertY);
  let zItem = randomValueFromArray(insertZ);

  newStory = newStory.replaceAll(":insertx:", xItem);
  newStory = newStory.replaceAll(":inserty:", yItem);
  newStory = newStory.replaceAll(":insertz:", zItem);

  // replaces 'Bob' w/ user's custom name (if provided)
  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replaceAll("Bob", name);
  }

  // converts imperial units to metric
  if(document.getElementById("uk").checked) {
    // lbs to st
    const weight = Math.round(300/14) + ' stone';
    newStory = newStory.replaceAll("300 pounds", weight);

    // °F to °C                  
    const temperature =  Math.round((94-32)*(5/9)) + ' centigrade';
    newStory = newStory.replaceAll("94 fahrenheit", temperature);
  }

  // display story
  story.textContent = newStory;
  story.style.visibility = 'visible';
}