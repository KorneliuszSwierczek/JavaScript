document.addEventListener("DOMContentLoaded", () => {
  const ball = document.getElementById("ball");
  const hole = document.getElementById("hole");
  const gameArea = document.getElementById("gameArea");
  const scoreDisplay = document.getElementById("score");
  const scoreList = document.getElementById("scoreList");
  const startButton = document.getElementById("startButton");

  const gameAreaRect = gameArea.getBoundingClientRect();
  let ballX = gameAreaRect.width / 2; // Startowa pozycja kulki na środku obszaru gry
  let ballY = gameAreaRect.height / 2;

  let velocityX = 0;
  let velocityY = 0;
  let score = 0;
  let isGameRunning = false;
  let startTime;
  const gameDuration = 60000; // Czas gry w milisekundach (60 sekund)

  function setPosition(element, x, y) {
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  }

  function resetBallAndHole() {
    // Losowe pozycje dla kulki i dziury
    const ballPosition = {
      x: Math.random() * (gameAreaRect.width - ball.clientWidth),
      y: Math.random() * (gameAreaRect.height - ball.clientHeight),
    };
    const holePosition = {
      x: Math.random() * (gameAreaRect.width - hole.clientWidth),
      y: Math.random() * (gameAreaRect.height - hole.clientHeight),
    };

    setPosition(ball, ballPosition.x, ballPosition.y);
    setPosition(hole, holePosition.x, holePosition.y);

    ballX = ballPosition.x;
    ballY = ballPosition.y;
  }

  function updateBallPosition(event) {
    if (!isGameRunning) return;

    const beta = event.beta; // Pochylenie w pionie
    const gamma = event.gamma; // Pochylenie w poziomie

    velocityX = gamma / 90; // Przekształcenie na wartość w zakresie -1 do 1
    velocityY = beta / 90; // Przekształcenie na wartość w zakresie -1 do 1
  }

  function animate() {
    if (!isGameRunning) return;

    ballX += velocityX * 5; // Wzmocnienie efektu
    ballY += velocityY * 5; // Wzmocnienie efektu

    ballX = Math.max(0, Math.min(gameAreaRect.width - ball.clientWidth, ballX));
    ballY = Math.max(
      0,
      Math.min(gameAreaRect.height - ball.clientHeight, ballY)
    );

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    checkCollision();

    requestAnimationFrame(animate);
  }

  function checkCollision() {
    const ballRect = ball.getBoundingClientRect();
    const holeRect = hole.getBoundingClientRect();

    const ballCenterX = ballRect.left + ballRect.width / 2;
    const ballCenterY = ballRect.top + ballRect.height / 2;

    const holeCenterX = holeRect.left + holeRect.width / 2;
    const holeCenterY = holeRect.top + holeRect.height / 2;

    const distance = Math.sqrt(
      Math.pow(ballCenterX - holeCenterX, 2) +
        Math.pow(ballCenterY - holeCenterY, 2)
    );
    const maxDistance = (holeRect.width + ballRect.width) / 4; // Odsunięcie ze względu na promienie

    if (distance < maxDistance) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      resetBallAndHole();
    }
  }

  function startGame() {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    resetBallAndHole();
    isGameRunning = true;
    startTime = Date.now();
    requestAnimationFrame(animate);
    window.addEventListener("deviceorientation", updateBallPosition);

    setTimeout(endGame, gameDuration); // Zakończ grę po upływie określonego czasu
  }

  function endGame() {
    isGameRunning = false;
    window.removeEventListener("deviceorientation", updateBallPosition);
    updateHighscores(score);
  }

  function updateHighscores(newScore) {
    const li = document.createElement("li");
    li.textContent = `Score: ${newScore}`;
    scoreList.appendChild(li);
  }

  startButton.addEventListener("click", startGame);
});
