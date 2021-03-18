//Global Variable

const clueHoldTime = 1000; // how long to hold each clue's light/sound
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

var pattern = [1,1,4,3,1,2,1,3];  //keeps track of the secret pattern the button presses
//var pattern = [];  //keeps track of the pattern the button presses
var progress = 0  //keep track of progress and status
var gamePlaying = false // keeps track od game is currently active or not
var tonePlaying = false;
var volume =0.5
var timer = 3;
var guessCounter = 0; 


function startGame(){
  progress = 0;
  gamePlaying = true;
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  
  playClueSequence();
  
  }

function stopGame(){
  gamePlaying = false;
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  
  }
function hideChance(){
  document.getElementById("welcome").classList.remove("hidden");
  document.getElementById("chance_prompt").classList.add("hidden");


}

// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
    

function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)


/* lighting or clearing button*/
function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}

function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}

function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}

function playClueSequence(){
   guessCounter = 0;
  const hold_on_time = 500;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
  
}

}

/*loseGame or winGame*/
function loseGame(){
  if(timer == 0){
    setTimeout(function(){alert("Time over, better luck next time");},50);
  }else{
    setTimeout(function(){alert("Game Over. You lost");},50);
  }
  stopGame();
  
}// end loseGame()


function winGame(){
  stopGame();
  alert("Game Over.You won!")

}


//the guess function
function guess(btn){
   console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }
  
  //handling guesses
  if( pattern[guessCounter]== btn){
    if(guessCounter == progress){
      if(progress == pattern.length - 1){
        winGame();
      }else{
        //clearTimer();
        //time.innerHTML = timer;
        progress++;
        playClueSequence()
      }
    }else{
      guessCounter++;
    }
  }else{
    //mistakes--;
    //life.innerHTML = mistakes;
    if(mistakes == 0){
      loseGame()
    }
  }
