
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = []; // array for randomly selected colors
var userClickedPattern = []; // array for user clicked colors

var started = false;
var level = 0;

//when a keypress event happens, 
// 1) change the previous title and set the level
// 2) Call the nextSequence function and start the game
$(document).keypress(function() {  
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// when a button click event happens,
// 1) push the clicked color in userClickedPattern
// 2) add sound and efects using playSound and animatePress function
// 3) check the answer using checkAnswer function 
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

// check pattern
function checkAnswer(currentLevel) {
    /*if random selected color (gamePattern array) and user clicked color (userClickedPattern array)
    matches for a specific index it will check the length of both array.
    1) if the length is equal then nextSequence function will be called to generate a new random color select 
    2) if the length is not equal,the next button click event is expected to be happened */ 
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } 
    
    // not matched, means user clicked wrong button
    // play a sound
    // add a class for game over effect and remove the effect after a certain period
    // call startOver function to restart
    else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

// 1) each time randomly select a color button
// 2) push the element in gamePattern array
// 3) add some effect and play sound for randomly choosen color 
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// add some effects when user click a button, and remove it after a certain time
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// play corresponding sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
