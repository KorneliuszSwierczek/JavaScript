const gameArea = document.getElementById("gameArea");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Dopasowanie rozmiaru obszaru do rozmiaru okna
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Losowa liczba kropek w zakresie od 1 do 100
const numDots = Math.floor(Math.random() * 100) + 1;

const dots = [];

for (let i = 0; i < numDots; i++) {
  const dot = document.createElement("div");
  dot.classList.add("dot");

  // Losowa pozycja dla każdej kropki
  const dotPosition = {
    x: Math.random() * (window.innerWidth - 10), // odejmujemy szerokość kropki
    y: Math.random() * (window.innerHeight - 10), // odejmujemy wysokość kropki
  };

  // Losowa prędkość i kierunek dla każdej kropki
  const dotSpeed = {
    x: (Math.random() * 2 - 1) * 2, // zakres prędkości od -2 do 2
    y: (Math.random() * 2 - 1) * 2, // zakres prędkości od -2 do 2
  };

  dot.style.left = `${dotPosition.x}px`;
  dot.style.top = `${dotPosition.y}px`;

  gameArea.appendChild(dot);

  dots.push({ element: dot, position: dotPosition, speed: dotSpeed });
}

// Funkcja aktualizująca pozycję kropek
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Czyścimy płótno przed narysowaniem kropek i linii

  dots.forEach((dot) => {
    dot.position.x += dot.speed.x;
    dot.position.y += dot.speed.y;

    // Sprawdzamy czy kropka nie wychodzi poza ekran i odbijamy ją
    if (dot.position.x <= 0 || dot.position.x >= window.innerWidth - 10) {
      dot.speed.x *= -1;
    }
    if (dot.position.y <= 0 || dot.position.y >= window.innerHeight - 10) {
      dot.speed.y *= -1;
    }

    dot.element.style.left = `${dot.position.x}px`;
    dot.element.style.top = `${dot.position.y}px`;

    // Rysowanie kropek na płótnie
    ctx.beginPath();
    ctx.arc(dot.position.x + 5, dot.position.y + 5, 5, 0, Math.PI * 2);
    ctx.fillStyle = dot.element.style.backgroundColor;
    ctx.fill();
  });

  // Rysowanie linii między kropkami, które są blisko siebie
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].position.x - dots[j].position.x;
      const dy = dots[i].position.y - dots[j].position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        // Odległość 10 pikseli jest zbyt mała do zauważenia, zmieniłem na 100
        ctx.beginPath();
        ctx.moveTo(dots[i].position.x + 5, dots[i].position.y + 5);
        ctx.lineTo(dots[j].position.x + 5, dots[j].position.y + 5);
        ctx.strokeStyle = "rgba(0, 0, 255, 0.8)"; // Kolor niebieski, bardziej widoczny
        ctx.lineWidth = 2; // Grubsza linia
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(update);
}

// Uruchomienie animacji
requestAnimationFrame(update);
