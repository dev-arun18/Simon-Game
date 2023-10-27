 var buttonColours = ["red", "blue", "green", "yellow" , "violet", "pink"]; // array of button colours
 var gamePattern = []; //empty array
 var userClickedPattern = []; //empty array
 var started = false; // assinging variable to false
 var level = 0;

 $(document).keypress(function() { //adding keypress to whole document
   if (!started) {
     $("#level-title").text("Level " + level); // with starting the game changing text with given id to level
     nextSequence();
     started = true; //variable toogle to true if game started by stopping further keypresss till the game is playing
   }
 });


 $(".btn").click(function() {
   var userChosenColour = $(this).attr("id"); //adding button click by jquery

   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length - 1);
 });



 function checkAnswer(currentLevel) {

   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
     if (userClickedPattern.length === gamePattern.length) {
       setTimeout(function() {
         nextSequence();
       }, 1000);
     }
   } else {
     playSound("wrong");
     $("body").addClass("game-over");
     $("#level-title").text("Game Over, Press any key to Restart");

     setTimeout(function() {
       $("body").removeClass("game-over");
     }, 200);
     startOver();
   }
 }

 //
 //
 //function of random number with adding random colour into empty array
 function nextSequence() {
   userClickedPattern = [];
   level++;
   //increasing level by one everytime function nextSequencegets called
   $("#level-title").text("Level " + level); // changing level by next level

   var randomNumber = Math.random();
   randomNumber = randomNumber * 6;
   randomNumber = Math.floor(randomNumber);

   var randomChosenColour = buttonColours[randomNumber];

   gamePattern.push(randomChosenColour);

   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //adding animation and sound on random chosen colour with jquery
   playSound(randomChosenColour);

 }


 function animatePress(currentColour) {
   $("#" + currentColour).addClass("pressed"); //adding animation by adding class
   setTimeout(function() {
     $("#" + currentColour).removeClass("pressed");
   }, 100); // removing class

 }


 function playSound(name) { //adding sound // this function is used in all the sections

   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
 }

 function startOver() {
   level = 0;
   gamePattern = [];
   started = false;
 }
