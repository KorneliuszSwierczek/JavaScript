document.addEventListener("DOMContentLoaded", function () {
  const noteForm = document.getElementById("noteForm");
  const notesContainer = document.getElementById("notes");
  const searchInput = document.getElementById("search");

  // Wczytaj notatki z localStorage po załadowaniu strony
  loadNotes();

  noteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const color = document.getElementById("color").value;
    const tags = document
      .getElementById("tags")
      .value.split(",")
      .map((tag) => tag.trim()); // Zamiana tagów na tablicę
    const pin = document.getElementById("pin").checked;
    const date = new Date().toLocaleString();

    // Tworzenie obiektu notatki
    const note = {
      title,
      content,
      color,
      tags,
      pin,
      date,
    };

    saveNoteToLocalStorage(note);
    loadNotes(); // Ponowne wczytanie notatek po dodaniu nowej
    noteForm.reset(); // Wyczyszczenie formularza po dodaniu notatki
  });

  searchInput.addEventListener("input", function () {
    loadNotes(this.value.toLowerCase());
  });

  // Funkcja zapisywania notatki do localStorage
  function saveNoteToLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  // Funkcja wczytywania notatek z localStorage i wyświetlania ich
  function loadNotes(searchQuery = "") {
    console.log("Wczytywanie notatek...");
    notesContainer.innerHTML = ""; // Czyszczenie kontenera przed wczytaniem notatek

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    // Sortowanie notatek, aby przypięte były na górze
    notes.sort((a, b) => b.pin - a.pin);

    // Jeśli nie ma zapytania wyszukiwania, wyświetl wszystkie notatki
    if (!searchQuery) {
      console.log(
        "Brak zapytania wyszukiwania, wyświetlanie wszystkich notatek."
      );
      notes.forEach((note) => {
        addNoteToContainer(note);
      });
      return;
    }

    // Jeśli jest zapytanie wyszukiwania, filtrowanie notatek
    console.log("Wyszukiwanie notatek na podstawie zapytania:", searchQuery);
    notes.forEach((note) => {
      const searchText = `${note.title} ${note.content} ${
        note.tags ? note.tags.join(" ") : ""
      }`.toLowerCase(); // Dodany warunek do odczytu tags
      if (searchText.includes(searchQuery.toLowerCase())) {
        addNoteToContainer(note);
      }
    });
  }

  // Funkcja dodawania notatki do kontenera
  function addNoteToContainer(note) {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.style.backgroundColor = note.color;

    const titleElement = document.createElement("h2");
    titleElement.textContent = note.title;

    const contentElement = document.createElement("p");
    contentElement.textContent = note.content;

    const tagsElement = document.createElement("p");
    tagsElement.textContent = note.tags ? `Tagi: ${note.tags.join(", ")}` : "";

    const dateElement = document.createElement("small");
    dateElement.textContent = `Utworzono: ${note.date}`;

    noteElement.appendChild(titleElement);
    noteElement.appendChild(contentElement);
    noteElement.appendChild(tagsElement);
    noteElement.appendChild(dateElement);

    // Dodajemy notatkę na górę kontenera, jeśli jest przypięta
    if (note.pin) {
      notesContainer.insertBefore(noteElement, notesContainer.firstChild);
    } else {
      notesContainer.appendChild(noteElement);
    }
  }
});
