const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];

//function to intialise the game

function initGame() {
    currentPlayer = "S";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    // UI empty
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        // gree color remove
        box.classList = `box box${index+1}`;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}
initGame();

function swapTurn() {
    if (currentPlayer === "O") {
        currentPlayer = "S";
    } else {
        currentPlayer = "O";
    }
    // ui update
    gameInfo.innerText = `Current Player -${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            // if winner x

            if (gameGrid[position[0]] === "S")
                answer = "S";
            else
                answer = "O";
            // disable pointer event
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })


            // now we know S/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    // we have a winner
    if (answer !== "") {
        gameInfo.innerText = `Winnner Player-${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // if tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "")
            fillCount++
    });

    if (fillCount === 9) {
        gameInfo.innerText = "Game Tie";
        newGameBtn.classList.add("active")
    }


}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap karo turn on

        swapTurn();
        //check 
        checkGameOver();

    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame)