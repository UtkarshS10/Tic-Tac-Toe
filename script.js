let currentPlayer="X";
let gameOver=false; 
let vsComputer=false;
let xScore = 0;
let oScore = 0;

const xScoreText = document.getElementById("xScore");
const oScoreText = document.getElementById("oScore");
const boxes=document.querySelectorAll(".box");
const turnText=document.getElementById("turnText");
const resetBtn=document.getElementById("resetBtn");
const playWithComputer=document.getElementById("playWithComputer");
const resetScoreBtn = document.getElementById("resetScoreBtn");

// Winning Combinations
const winningPatterns=[
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6]
]; 

// Check winner
function checkWinner() {

  for (let pattern of winningPatterns) {

    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    // Ignore empty boxes
    if (pos1 === "" || pos2 === "" || pos3 === "") {
      continue;
    }

    // Winner found
    if (pos1 === pos2 && pos2 === pos3) {
        if(vsComputer && pos1!="X") {
           turnText.innerText=`You Lost!`;
        }
        else {
    turnText.innerText = `Congratulations, Player ${pos1} Wins!`; 
    };
    gameOver = true;

     // Update score
    if (pos1 === "X") {
        xScore++;
        xScoreText.innerText = xScore;
    }
    else {
        oScore++;
        oScoreText.innerText = oScore;
    } 

    // Highlight winning boxes
    boxes[pattern[0]].classList.add(
    "bg-green-500",
    "scale-110",
    "shadow-lg",
   "animate-pulse"
  );

    boxes[pattern[1]].classList.add(
    "bg-green-500",
    "scale-110",
    "shadow-lg",
   "animate-pulse"
  );

    boxes[pattern[2]].classList.add(
    "bg-green-500",
    "scale-110",
    "shadow-lg",
   "animate-pulse"
  );
    return;
    }
  }
} 

// Computer move
function computerMove() {
    currentPlayer="X";
    // store empty boxes
    let emptyBoxes=[];
    boxes.forEach((box,index)=>{
        if(box.innerText=="") {
            emptyBoxes.push(index);
        }
    });

    // No move possible
    if(emptyBoxes.length==0) {
        return;
    }

    // Random empty position
    let randomIndex= emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    // Put O
    boxes[randomIndex].innerText = "O";
    
} 

// Click handling while playing with computer
playWithComputer.addEventListener("click",()=>{
    vsComputer=true;
});

// Click handling default 
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        // Stop if the game ends
        if(gameOver) {
            return;
        } 

        // Prevent overwriting
        if(box.innerText !== "") {
            return;
        }
        // Put X or O
        box.innerText=currentPlayer;

        // Check winner
        checkWinner();
        
        // Switch player only if game continues
        if(!gameOver) {
            if(vsComputer){
                computerMove();
                checkWinner();
                if(gameOver) {
                return;
                }
            } 
            else if(currentPlayer==="X") { 
            currentPlayer="O";
            }
            else {
            currentPlayer="X";
        }

        // Update turn text
        turnText.innerText=`Player ${currentPlayer} Turn`;
    }
    });
}); 

// Reset game
resetBtn.addEventListener("click",()=> {
    boxes.forEach((box)=>{
        box.innerText="";
        box.classList.remove(
        "bg-green-500",
        "scale-110",
        "shadow-lg",
        "animate-pulse"
        ); 
    });
    currentPlayer="X";
    gameOver=false;
    vsComputer=false;
    turnText.innerText="Player X turn";
}); 

// Reset Scores
resetScoreBtn.addEventListener("click", () => {

  xScore = 0;
  oScore = 0;

  xScoreText.innerText = xScore;
  oScoreText.innerText = oScore;

}); 
