// Asynchroniczna funkcja dodająca
const asyncAdd = async (a, b) => {
  if (typeof a !== "number" || typeof b !== "number") {
    return Promise.reject("Argumenty muszą mieć typ number!");
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a + b);
    }, 100);
  });
};

// Funkcja do mierzenia czasu wykonania
const measureTime = async (fn, ...args) => {
  const start = performance.now();
  const result = await fn(...args);
  const end = performance.now();
  return { result, time: end - start };
};

// Funkcja asynchronicznie dodająca liczby
const asyncSum = async (numbers) => {
  let sum = 0;
  for (const num of numbers) {
    sum = await asyncAdd(sum, num);
  }
  return sum;
};

// Testowanie funkcji z 100 elementami
(async () => {
  // Generowanie 100 losowych liczb całkowitych
  const numbers = Array.from({ length: 100 }, () =>
    Math.floor(Math.random() * 100)
  );

  // Mierzenie czasu wykonania asyncSum
  const { result, time } = await measureTime(asyncSum, numbers);
  const div = document.getElementById("main");
  div.innerHTML = `Result: ${result}<br>
  Required time: ${time.toFixed(2)} ms<br>
  Number of operations: ${numbers.length}`;

  console.log(`Result: ${result}`);
  console.log(`Required time: ${time.toFixed(2)} ms`);
  console.log(`Number of operations: ${numbers.length}`);
})();
