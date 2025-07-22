console.log("welcome to tictactoe");

// ─── Audio ─────────────────────────────────────────────────────────────
const audioTurn = new Audio("audio/ting.mp3");
const gameover = new Audio("audio/gameover.mp3");

// ─── Game state ────────────────────────────────────────────────────────
let turn = "X";
let isGameOver = false;

// ─── Cached DOM references (faster & cleaner) ─────────────────────────
const info = document.querySelector(".info");
const line = document.querySelector(".line");
const imgBox = document.querySelector(".imgbox img");

// ─── Helpers ───────────────────────────────────────────────────────────
const changeTurn = () => (turn === "X" ? "O" : "X");

/*
 *  winSpec: [index1, index2, index3, translateX_vw, translateY_vw, rotate_deg]
 *  These extra numbers let us draw the strike-through line for every win.
 */
const winSpec = [
  [0, 1, 2, 5, 5, 0],
  [3, 4, 5, 5, 15, 0],
  [6, 7, 8, 5, 25, 0],
  [0, 3, 6, -5, 15, 90],
  [1, 4, 7, 5, 15, 90],
  [2, 5, 8, 15, 15, 90],
  [0, 4, 8, 5, 15, 45],
  [2, 4, 6, 5, 15, -45],
];

function checkWin() {
  const boxText = document.getElementsByClassName("boxtext");

  winSpec.forEach(([a, b, c, tx, ty, rot]) => {
    if (
      boxText[a].innerText !== "" &&
      boxText[a].innerText === boxText[b].innerText &&
      boxText[b].innerText === boxText[c].innerText
    ) {
      // Someone won!
      info.innerText = `${boxText[a].innerText} won 🎉`;
      isGameOver = true;

      // Visuals
      imgBox.style.width = "200px";
      line.style.width = "20vw";
      line.style.transform = `translate(${tx}vw, ${ty}vw) rotate(${rot}deg)`;

      gameover.play();
    }
  });
}

// ─── Main game loop ────────────────────────────────────────────────────
Array.from(document.getElementsByClassName("box")).forEach((box) => {
  const boxText = box.querySelector(".boxtext");

  box.addEventListener("click", () => {
    if (boxText.innerText === "" && !isGameOver) {
      boxText.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      checkWin();

      if (!isGameOver) info.innerText = `Turn for ${turn}`;
    }
  });
});

// ─── Reset button ──────────────────────────────────────────────────────
document.getElementById("reset").addEventListener("click", () => {
  document.querySelectorAll(".boxtext").forEach((b) => (b.innerText = ""));

  turn = "X";
  isGameOver = false;
  info.innerText = `Turn for ${turn}`;

  // Hide strike-through & trophy
  line.style.width = "0";
  imgBox.style.width = "0";
});
