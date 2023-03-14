const noteContainer = document.querySelector("#note_app");
const addNewNoteBtn = document.querySelector(".add_note");

// Create new Note via clicking on create button
addNewNoteBtn.addEventListener("click", () => createNoteElement());

// Create new Note
const createNoteElement = (content = "") => {
  const createNote = document.createElement("textarea");
  createNote.classList.add("note");
  createNote.autofocus = true;
  createNote.placeholder = "Write your Note here";
  createNote.textContent = content;
  noteContainer.appendChild(createNote);
  noteContainer.insertBefore(createNote, addNewNoteBtn);
  saveNotes();

  //   Delete the Note on double click
  createNote.addEventListener("dblclick", () => deleteNote(createNote));

  //   Save the Notes on every change
  createNote.addEventListener("change", () => saveNotes());
};

// Save the Notes
const saveNotes = () => {
  const notes = document.querySelectorAll(".note");
  const noteData = [];
  notes.forEach((note) => noteData.push(note.value));
  localStorage.setItem("notes", JSON.stringify(noteData));
};

// Delete the Note
const deleteNote = (createNote) => {
  const doDelete = confirm("Are you sure you wish to delete this Note?");

  if (doDelete) {
    createNote.remove();
    saveNotes();
  }
};

// Show saved Notes on pageload

(() => {
  const localStorageNotes = JSON.parse(localStorage.getItem("notes"));

  if (localStorageNotes === null) {
    createNoteElement();
  } else {
    localStorageNotes.forEach((localStorageNotes) =>
      createNoteElement(localStorageNotes)
    );
  }
})();
