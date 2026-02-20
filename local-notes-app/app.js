let notes = JSON.parse(localStorage.getItem("notes")) || [];

const noteInput = document.getElementById("noteText");
const addBtn = document.getElementById("addBtn");
const container = document.getElementById("notesContainer");

noteInput.focus();

function saveToStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
  container.innerHTML = "";

  notes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    const p = document.createElement("p");
    p.innerText = note;

    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.onclick = () => deleteNote(index);

    noteDiv.appendChild(p);
    noteDiv.appendChild(delBtn);
    container.appendChild(noteDiv);
  });
}

function addNote() {
  const text = noteInput.value.trim();
  if (!text) return;

  notes.unshift(text);
  saveToStorage();
  renderNotes();
  noteInput.value = "";
  noteInput.focus();
}

function deleteNote(index) {
  notes.splice(index, 1);
  saveToStorage();
  renderNotes();
}

addBtn.addEventListener("click", addNote);

noteInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    addNote();
  }
});

renderNotes();