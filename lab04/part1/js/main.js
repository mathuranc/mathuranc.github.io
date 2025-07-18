// 'Custom Name' text field
const customName = document.getElementById('customname');

// query selectors
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

// returns random element from array
function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

// initialize string variables of story
let storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:," +
                "they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was" + 
                " not surprised — :insertx: weighs 300 pounds, and it was a hot day.";
let insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
let insertY = ["the soup kitchen", "Disneyland", "the White House"];
let insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];

// initialize event listener
randomize.addEventListener('click', result);

// generates randomized story for user
function result() {
  // initialize String variables
  let newStory = storyText;
  let xItem = randomValueFromArray(insertX);
  let yItem = randomValueFromArray(insertY);
  let zItem = randomValueFromArray(insertZ);

  // replace placeholders in newStory
  newStory = newStory.replaceAll(":insertx:", xItem);
  newStory = newStory.replaceAll(":inserty:", yItem);
  newStory = newStory.replaceAll(":insertz:", zItem);

  // replaces 'Bob' w/ user's custom name
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

  // output randomly generated story for user
  story.textContent = newStory;
  story.style.visibility = 'visible';
}