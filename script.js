//Global Variable
var pattern = [1,1,4,3,1,2,1,3];  //keeps track of the secret pattern the button presses
//var pattern = [];  //keeps track of the pattern the button presses
var progress = 0  //keep track of progress and status
var gamePlaying = false // keeps track od game is currently active or not

function startGame(){
  progress = 0;
  gamePlaying = true;
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  
  }

function stopGame(){
  gamePlaying = false;
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  
  }