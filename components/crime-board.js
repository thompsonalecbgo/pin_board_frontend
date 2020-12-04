import { useState, useCallback } from "react";

import { addNote } from "../lib/notes";
import EditableNote from "../components/editable-note";
import DraggableNote from "../components/draggable-note";

function renderNote(note) {
  return <DraggableNote key={note.id} note={note} toEdit={note.toEdit} />;
}

export default function CrimeBoard(props) {
  const savedNotes = props.notes.map((note) => {
    return { ...note, toEdit: false };
  });
  const [notes, setNotes] = useState(savedNotes);

  const handleDoubleClick = useCallback(
    async (e) => {
      const addedNote = await addNote({ text: "" });
      setNotes([...notes, { ...addedNote, toEdit: true }]);
    },
    [notes]
  );

  return (
    <div id="crime-board" onDoubleClick={handleDoubleClick}>
      {notes.map((note) => renderNote(note))}
    </div>
  );
}
