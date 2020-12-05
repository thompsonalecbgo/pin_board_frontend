const url = "http://localhost:8000/api/v1";

export async function getNotesData() {
  const res = await fetch(`${url}/notes/`);
  const notes = await res.json();
  if (notes.errors) {
    throw new Error("Failed to fetch API");
  }
  return notes;
}

export async function getUnemptyNotesData() {
  let notes = await getNotesData();
  notes = notes.filter((note) => {
    if (!note.text) {
      deleteNote({ id: note.id })
    } else {
      return note
    }
  })
  return notes;
}

export async function addNote({ text }) {
  const res = await fetch(`${url}/notes/`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ text }),
  });
  const note = await res.json();
  if (note.errors) {
    console.error(note.errors);
    throw new Error("Failed to fetch API");
  }
  return note;
}

export async function editNoteText({ text, id }) {
  const res = await fetch(`${url}/notes/${id}/`, {
    headers: { "Content-Type": "application/json" },
    method: "PUT",
    body: JSON.stringify({ text }),
  });
  const note = await res.json();
  if (note.errors) {
    console.error(note.errors);
    throw new Error("Failed to fetch API");
  }
  return note;
}

export async function editNoteLocation({ id, top, left }) {
  const res = await fetch(`${url}/notes/${id}/`, {
    headers: { "Content-Type": "application/json" },
    method: "PUT",
    body: JSON.stringify({ top, left }),
  });
  const note = await res.json();
  if (note.errors) {
    console.error(note.errors);
    throw new Error("Failed to fetch API");
  }
  return note;
}

export async function deleteNote({ id }) {
  try {
    await fetch(`${url}/notes/${id}/`, {
      method: "DELETE",
    });
  } catch(error) {
    console.log(error.message)
  }
}