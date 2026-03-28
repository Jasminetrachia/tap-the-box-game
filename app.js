let score = 0;
let level = 1;
let gameTime = 10;
let playing = false;
let speed = 800; 
let box = document.getElementById("box");

// tiny embedded click sound
const clickSound = new Audio("data:audio/mp3;base64,//uQxAAAAAAD..."); 
// (I’ll give you the full base64 string in the next step, ready to paste)

document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {
  score = 0;
  level = 1;
  gameTime = 10;
  speed = 800;
  playing = true;

  document.getElementById("score").innerText = score;
  document.getElementById("level").innerText = level;
  document.getElementById("timer").innerText = gameTime;

  box.style.display = "block";

  moveBox();
  countdown();
}

function moveBox() {
  if (!playing) return;

  let x = Math.random() * (window.innerWidth - 100);
  let y = Math.random() * (window.innerHeight - 150);

  box.style.left = x + "px";
  box.style.top = y + "px";

  let scale = 0.8 + Math.random() * 0.4;
  box.style.transform = `scale(${scale}) rotate(${Math.random() * 20 - 10}deg)`;

  setTimeout(moveBox, speed);
}

box.addEventListener("click", () => {
  if (!playing) return;
  score++;
  clickSound.play();
  document.getElementById("score").innerText = score;

  if (score % 5 === 0) {
    level++;
    speed = Math.max(300, speed - 100); 
    document.getElementById("level").innerText = level;
  }
});

function countdown() {
  if (!playing) return;

  if (gameTime > 0) {
    gameTime--;
    document.getElementById("timer").innerText = gameTime;
    setTimeout(countdown, 1000);
  } else {
    endGame();
  }
}

function endGame() {
  playing = false;
  box.style.display = "none";
  alert(`🎉 Game Over! Score: ${score} | Level: ${level}`);
}
