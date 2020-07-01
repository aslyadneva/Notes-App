const fs = require("fs");

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find((note) => note.title === title);

  // debugger;

  if (!duplicateNote) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log("New note added");
  } else {
    console.log("A note with this title already exists");
  }
};

const removeNote = (title) => {
  const notes = loadNotes();

  let notesToKeep;
  if (notes.length > 0) {
    notesToKeep = notes.filter((note) => note.title != title);

    if (notesToKeep.length < notes) {
      saveNotes(notes);
      console.log(`Note called ${title} was removed`);
    } else {
      console.log(`Note not found`);
    }
  } else {
    console.log("There are no notes to remove");
  }
};

const listNotes = () => {
  const notes = loadNotes();

  if (notes.length == 0) {
    console.log("You don't have any notes yet");
  } else {
    console.log("Your notes");
    notes.forEach((note, idx) =>
      console.log(`Note #${idx + 1}) ${note.title}`)
    );
  }
};

const readNote = (title) => {
  const notes = loadNotes();

  const noteToRead = notes.find((note) => note.title == title);

  if (noteToRead) {
    console.log(`Title: ${noteToRead.body} Body: ${noteToRead.body}`);
  } else {
    console.log("This note does not exist");
  }
};

const saveNotes = (notesArr) => {
  const notesJSON = JSON.stringify(notesArr);
  fs.writeFileSync("notes.json", notesJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const notes = JSON.parse(dataBuffer.toString());
    return notes;
  } catch (err) {
    return [];
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
};
