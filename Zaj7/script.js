// Pobranie canvas i kontekstu 2D
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Pobranie elementów formularza
const numBallsInput = document.getElementById("numBalls");
const distanceInput = document.getElementById("distance");
const distanceValue = document.getElementById("distanceValue");

// Ustawienie początkowych wartości
let numBalls = parseInt(numBallsInput.value);
let minDistance = (parseInt(distanceInput.value) / 100) * canvas.width;

// Tablica przechowująca informacje o kulach
let balls = [];

// Funkcja do generowania losowych liczb
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Funkcja rysująca kulki
function drawBall(x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

// Funkcja rysująca linię między kulami
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
  ctx.stroke();
}

// Funkcja do rysowania wszystkich kul i linii
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < balls.length; i++) {
    drawBall(balls[i].x, balls[i].y, balls[i].radius, balls[i].color);
    for (let j = i + 1; j < balls.length; j++) {
      let dx = balls[i].x - balls[j].x;
      let dy = balls[i].y - balls[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < minDistance) {
        drawLine(balls[i].x, balls[i].y, balls[j].x, balls[j].y);
      }
    }

    // Aktualizacja pozycji kuli
    balls[i].x += balls[i].dx;
    balls[i].y += balls[i].dy;

    // Odbijanie się od krawędzi
    if (
      balls[i].x + balls[i].radius >= canvas.width ||
      balls[i].x - balls[i].radius <= 0
    ) {
      balls[i].dx = -balls[i].dx;
    }
    if (
      balls[i].y + balls[i].radius >= canvas.height ||
      balls[i].y - balls[i].radius <= 0
    ) {
      balls[i].dy = -balls[i].dy;
    }
  }

  requestAnimationFrame(draw);
}

// Funkcja do rozpoczęcia animacji
function startAnimation() {
  numBalls = parseInt(numBallsInput.value);
  minDistance = (parseInt(distanceInput.value) / 100) * canvas.width;

  // Usunięcie istniejących kul
  balls = [];

  // Generowanie nowych kul
  for (let i = 0; i < numBalls; i++) {
    let radius = random(5, 20);
    let x = random(radius, canvas.width - radius);
    let y = random(radius, canvas.height - radius);
    let dx = random(-2, 2);
    let dy = random(-2, 2);
    let color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
    balls.push({ x, y, radius, dx, dy, color });
  }

  draw();
}

// Funkcja do resetowania animacji
function resetAnimation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls = [];
}
