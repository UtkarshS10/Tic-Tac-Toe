let currentPlayer="X";
let gameOver=false; 
let vsComputer=false;
let vsComputer1=false;
let xScore = 0;
let oScore = 0;

const xScoreText = document.getElementById("xScore");
const oScoreText = document.getElementById("oScore");
const boxes=document.querySelectorAll(".box");
const turnText=document.getElementById("turnText");
const resetBtn=document.getElementById("resetBtn");
const playWithComputer=document.getElementById("playWithComputer");
const resetScoreBtn = document.getElementById("resetScoreBtn");
const level= document.getElementById("level");
const level1= document.getElementById("level1");
const level2= document.getElementById("level2");

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

// Draw condition
function checkDraw() {
    let isDraw = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });

    if (isDraw && !gameOver) {
        gameOver = true;
            turnText.innerText=`It's a draw!`;
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

// Hard level
function computerMove1() {

  // 1. Try to win
  let move = findBestMove("O");

  // 2. Block player win
  if (move === -1) {
    move = findBestMove("X");
  }

  // 3. Take center
  if (move === -1 && boxes[4].innerText === "") {
    move = 4;
  }

  // 4. Take corners
  if (move === -1) {
    const corners = [0, 2, 6, 8];
    for (let corner of corners) {
        if (boxes[corner].innerText === "") {
        move = corner;
        break;
      }
    }
}

  // 5. Take any empty box
  if (move === -1) {
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].innerText === "") {
        move = i;
        break;
      }
    }
} 

  // Make move
  if (move !== -1) {
    boxes[move].innerText = "O";
    }
} 


// Find winning/blocking move
function findBestMove(player) {

  for (let pattern of winningPatterns) {
    let [a, b, c] = pattern;
    let values = [
      boxes[a].innerText,
      boxes[b].innerText,
      boxes[c].innerText
    ];

    // Count player's marks
    let countPlayer =
      values.filter(v => v === player).length;

    let countEmpty =
      values.filter(v => v === "").length;

    // If 2 same + 1 empty
    if (countPlayer === 2 && countEmpty === 1) {

      if (boxes[a].innerText === "") return a;
      if (boxes[b].innerText === "") return b;
      if (boxes[c].innerText === "") return c;
        }
    }
    return -1;
} 

// Click handling while playing with computer
playWithComputer.addEventListener("click",()=>{
    level.classList.remove("hidden");
    level.classList.add("flex");
}); 

level1.addEventListener("click",()=>{
    vsComputer=true;
});

level2.addEventListener("click",()=>{
    vsComputer1=true;
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
                checkDraw();
                if(gameOver) {
                return;
                }
            } 
            else if(vsComputer1){
                computerMove1();
                checkWinner();
                checkDraw();
                if(gameOver) {
                return;
                }
            }
            else if(currentPlayer==="X") { 
                checkDraw();
                if(gameOver) return;
                currentPlayer="O";
            }
            else {
                checkDraw();
                if(gameOver) return;
                currentPlayer="X";
        }

        // Update turn text
        turnText.innerText=`Player ${currentPlayer} Turn`;
    }
    });
}); 

// Reset game
resetBtn.addEventListener("click",()=> {
    level.classList.add("hidden");
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
    vsComputer1=false;
    turnText.innerText="Player X turn";
}); 

// Reset Scores
resetScoreBtn.addEventListener("click", () => {

  xScore = 0;
  oScore = 0;

  xScoreText.innerText = xScore;
  oScoreText.innerText = oScore;

}); 
