let currentPlayer="X";
let gameOver=false;

const boxes=document.querySelectorAll(".box");
const turnText=document.getElementById("turnText");
const resetBtn=document.getElementById("resetBtn");

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

      turnText.innerText = `Player ${pos1} Wins!`;

      gameOver = true;

      return;
    }

  }

}

// Click handling
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
        if(currentPlayer==="X") {
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
    });
    currentPlayer="X";
    gameOver=false;
    turnText.innerText="Player X turn";
}); 
