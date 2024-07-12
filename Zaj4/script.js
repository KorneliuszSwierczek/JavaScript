document.addEventListener("DOMContentLoaded", function () {
  const noteForm = document.getElementById("noteForm");
  const notesContainer = document.getElementById("notes");
  const searchInput = document.getElementById("search");

  
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

    
    const note = {
      title,
      content,
      color,
      tags,
      pin,
      date,
    };

    saveNoteToLocalStorage(note);
    loadNotes(); 
    noteForm.reset(); 
  });

  searchInput.addEventListener("input", function () {
    loadNotes(this.value.toLowerCase());
  });

  
  function saveNoteToLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
  }

 
  function loadNotes(searchQuery = "") {
    console.log("Wczytywanie notatek...");
    notesContainer.innerHTML = ""; 

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    
    notes.sort((a, b) => b.pin - a.pin);

    
    if (!searchQuery) {
      console.log(
        "Brak zapytania wyszukiwania, wyświetlanie wszystkich notatek."
      );
      notes.forEach((note) => {
        addNoteToContainer(note);
      });
      return;
    }

    
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

   
    if (note.pin) {
      notesContainer.insertBefore(noteElement, notesContainer.firstChild);
    } else {
      notesContainer.appendChild(noteElement);
    }
  }
});
