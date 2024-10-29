let boxes = document.querySelectorAll(".box");
let resetGameBtn = document.querySelector("#reset_btn");
let newGameBtn = document.querySelector("#new_btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; // Player X or O
let gameActive = true; // Track if the game is still active
let winTimeout; // Store the timeout for auto-reset

const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7],
    [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!gameActive) return; // Prevent further moves if game is over

        console.log("box was clicked");
        if (turn0) {
            turn0 = false;
            box.innerText = "0";
        } else {
            turn0 = true;
            box.innerText = "X";
        }
        box.disabled = true;
        checkWinner();
    });
});

const resetGame = () => {
    turn0 = true;
    gameActive = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    clearTimeout(winTimeout); // Clear any pending auto-reset
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const showMessage = (message) => {
    msg.innerText = message;
    msgContainer.classList.remove("hide");
};

const showWinner = (winner) => {
    showMessage(`Congratulations, Winner is ${winner}`);
    gameActive = false;
    disableBoxes();
    autoResetGame(); // Start the 20s  timer to reset
};

const autoResetGame = () => {
    winTimeout = setTimeout(resetGame, 20000); // 20 seconds (20*1000 ms)
};

const checkDraw = () => {
    return Array.from(boxes).every((box) => box.innerText !== "");
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            console.log("Winner", pos1Val);
            showWinner(pos1Val);
            return; // Stop further checks if a winner is found
        }
    }

    // If no winner and all boxes are filled, it's a draw
    if (checkDraw()) {
        showMessage("It's a draw!");
        gameActive = false;
        disableBoxes();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetGameBtn.addEventListener("click", resetGame);
