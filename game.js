//set variables
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var gameStart = false;

//Starts game after first keypress
$(document).keypress(function () {
  if (gameStart === false) {
    $("h1").text("Level " + level);
    nextSequence();
    //modifies var so if you press the key so the function is only called once
    gameStart = true;
  }
});

//Advances to the next level in the game
function nextSequence() {
  level = level + 1;
  $("h1").text("Level " + level);

  //chooses random color and adds it to the array
  var randomNumber = Math.round(Math.random() * 3, 0);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //animates the chosen color
  $("." + randomChosenColour)
    .fadeOut(50)
    .fadeIn(50);
  playSound(randomChosenColour);

  //resets user pattern
  userClickedPattern = [];
}

//registers user click and passes answer
$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  //animates button & plays sound
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //Calls to check answer
  checkAnswer(userClickedPattern.length - 1);
});

//plays corresponding sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//animates button
function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

//Checks to see if the latest answer is correct
function checkAnswer(currentLevel) {
  //checks if the most recent answer is correct
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //then checks if the user is finished with the sequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    //actions if the user is wrong
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

//restarts game
function startOver() {
  gamePattern = [];
  level = 0;
  gameStart = false;
}
