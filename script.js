const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
let currentCard = "";
let previousCard = "";
let prevCardId = "";
let cardsClicked = 0;
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let counter = 0;
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.id = counter;
    counter++;
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if(!currentCard){
    currentCard = event.target.className
    console.log(currentCard);
    prevCardId = event.target.id;
  } else {previousCard = currentCard};
  event.target.classList.add("active")
  if (!event.target.classList.contains(currentCard) && currentCard){
    setTimeout(() => {
      document.querySelectorAll(".active").forEach(
        (card)=>{
          if (! card.classList.contains("matched")) {card.classList.remove("active")};
        }
      );
      currentCard = "";
      previousCard = "";
      prevCardId = "";
      cardsClicked = 0;
    }, 1000);
  } 
  if (event.target.classList.contains(currentCard) && event.target.id !== prevCardId && currentCard==previousCard){
    console.log("cards match", currentCard)
    document.querySelectorAll('.'+ currentCard).forEach(
      (card)=>{
        card.classList.add("matched");
      }
    )
  }
  // you can use event.target to see which element was clicked
    cardsClicked++
  if (cardsClicked >= 2){
    event.stopPropagation();
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */