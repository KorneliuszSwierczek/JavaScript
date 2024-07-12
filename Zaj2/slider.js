document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelector(".slides");
  const slideWidth = document.querySelector(".slide").offsetWidth;
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;

  function goToSlide(index) {
    slides.style.transform = `translateX(-${slideWidth * index}px)`;
    currentIndex = index;
    updateDots();
  }

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function nextSlide() {
    if (currentIndex === dots.length - 1) {
      goToSlide(0);
    } else {
      goToSlide(currentIndex + 1);
    }
  }

  function prevSlide() {
    if (currentIndex === 0) {
      goToSlide(dots.length - 1);
    } else {
      goToSlide(currentIndex - 1);
    }
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  document.querySelector(".prev").addEventListener("click", prevSlide);
  document.querySelector(".next").addEventListener("click", nextSlide);

  setInterval(nextSlide, 5000); // Automatyczne przewijanie co 5 sekund
});
