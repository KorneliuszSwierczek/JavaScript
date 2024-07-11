const clap = document.querySelector("#clap");
const boom = document.querySelector("#boom");
const hihat = document.querySelector("#hihat");

const sounds = {
  a: boom,
  b: clap,
  c: hihat,
};

// Tablice do przechowywania nagrań dla każdego kanału
let recordings = [[], [], [], []];
let isRecording = [false, false, false, false];
let startTime;

// Obsługa zdarzeń naciśnięcia klawisza
document.addEventListener("keypress", (ev) => {
  console.log(ev);

  const sound = sounds[ev.key];
  if (sound) {
    sound.currentTime = 0;
    sound.play();

    // Jeśli nagrywanie jest aktywne, zapisz zdarzenie
    for (let i = 0; i < isRecording.length; i++) {
      if (isRecording[i]) {
        recordings[i].push({
          key: ev.key,
          time: Date.now() - startTime,
        });
      }
    }
  }
});

// Funkcja rozpoczęcia nagrywania
function startRecording(channel) {
  recordings[channel] = [];
  isRecording[channel] = true;
  startTime = Date.now();
  console.log(`Recording started on channel ${channel + 1}`);
}

// Funkcja zatrzymania nagrywania
function stopRecording(channel) {
  isRecording[channel] = false;
  console.log(`Recording stopped on channel ${channel + 1}`);
}

// Funkcja odtwarzania nagrania
function playRecording(channel) {
  if (recordings[channel].length === 0) return;

  recordings[channel].forEach((event) => {
    setTimeout(() => {
      const sound = sounds[event.key];
      sound.currentTime = 0;
      sound.play();
    }, event.time);
  });
  console.log(`Playing recording on channel ${channel + 1}`);
}

// Funkcja odtwarzania wszystkich nagrań jednocześnie
function playAll() {
  for (let i = 0; i < recordings.length; i++) {
    playRecording(i);
  }
  console.log("Playing all channels");
}
