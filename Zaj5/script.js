// Funkcja z zajęć
const asyncAdd = async (a, b) => {
  if (typeof a !== "number" || typeof b !== "number") {
    return Promise.reject("Argumenty muszą mieć typ number!");
  }
  return new Promise((resolve, reject) => {
    console.log(`Rozpoczynam dodawanie: ${a} + ${b}`);
    setTimeout(() => {
      const result = a + b;
      console.log(`Zakończono dodawanie: ${a} + ${b} = ${result}`);
      resolve(result);
    }, 100);
  });
};

const sumAsync = async (...numbers) => {
  if (numbers.length === 0) {
    return 0;
  }
  let sum = numbers[0];
  console.log(`Początkowa suma: ${sum}`);
  for (let i = 1; i < numbers.length; i++) {
    console.log(`Dodawanie ${numbers[i]} do sumy ${sum}`);
    sum = await asyncAdd(sum, numbers[i]);
    console.log(`Aktualna suma: ${sum}`);
  }
  return sum;
};

const measureExecutionTime = async (func, ...args) => {
  console.log("Rozpoczynam pomiar czasu...");
  const start = performance.now();
  const result = await func(...args);
  const end = performance.now();
  const time = end - start;
  console.log(`Zakończono pomiar czasu: ${time.toFixed(2)} ms`);
  return { result, time };
};

// Funkcja testująca
const testSumAsync = async () => {
  const numbers = [1, 2, 3, 4, 5];
  try {
    const { result, time } = await measureExecutionTime(sumAsync, ...numbers);
    console.log(`Wynik dodawania: ${result}`);
    console.log(`Czas wykonania: ${time.toFixed(2)} ms`);
    console.log(`Ilość operacji asynchronicznych: ${numbers.length - 1}`);
  } catch (error) {
    console.error(`Błąd: ${error}`);
  }
};

// Uruchomienie funkcji testującej
testSumAsync();
