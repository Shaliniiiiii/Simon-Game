// Array of button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// An array to store the game's pattern
var gamePattern = [];

// An array to store the user's clicked pattern
var userClickedPattern = [];

// Flag to track if the game has started
var started = false;

// Variable to track the current level
var level = 0;

// Listen for a keypress event to start the game
$(document).keypress(function(){
  if(!started){
    // Update the level title
    $("#level-title").text("Level " + level);
    // Start the game by generating the next sequence
    nextSequence();
    started = true;
  }
});

// Handle button clicks
$(".btn").click(function(){

  // Get the color of the clicked button
  var userChosenColour = $(this).attr("id");

  // Add the clicked color to the user's pattern
  userClickedPattern.push(userChosenColour);

  // Play a sound for the clicked color
  playSound(userChosenColour);

  // Animate the button press
  animatePress(userChosenColour);

  // Check if the user's pattern matches the game's pattern
  checkAnswer(userClickedPattern.length-1);
});

// Check if the user's pattern is correct
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    // Check if the user has completed the current sequence
    if (userClickedPattern.length === gamePattern.length){
      // Wait for a second and then generate the next sequence
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    // Play a "wrong" sound
    playSound("wrong");

    // Add a red flash to the background
    $("body").addClass("game-over");

    // Remove the red flash after 200 milliseconds
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Update the level title to indicate the game is over
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Reset the game
    startOver();
  }
}

// Generate the next sequence
function nextSequence(){

  // Reset the user's clicked pattern
  userClickedPattern = [];

  // Increment the level
  level++;

  // Update the level title
  $("#level-title").text("Level " + level);

  // Generate a random number between 0 and 3
  var randomNumber = Math.floor(Math.random()*4);

  // Use the random number to select a color from the buttonColours array
  var randomChosenColour = buttonColours[randomNumber];

  // Add the selected color to the game's pattern
  gamePattern.push(randomChosenColour);

  // Animate the button by making it flash
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play a sound for the selected color
  playSound(randomChosenColour);
}

// Play a sound for a given color
function playSound(name){
  var sound = new Audio("sounds/"+name+".mp3");
  sound.play();
}

// Add a "pressed" class to animate the button press
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

// Reset the game when it's over
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
