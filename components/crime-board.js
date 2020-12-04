import { useState, useCallback } from "react";

import { addNote } from "../lib/notes";
import EditableNote from "../components/editable-note";
import DraggableNote from "../components/draggable-note";

export default function CrimeBoard(props) {
  const savedNotes = props.notes.map((note) => {
    return { ...note, toEdit: false };
  });
  const [notes, setNotes] = useState(savedNotes);

  // const handleDoubleClick = async (e) => {
  //   const addedNote = await addNote({ text: "" });
  //   setNotes([...notes, { ...addedNote, toEdit: true }]);
  // };

  const handleDoubleClick = useCallback(
    async (e) => {
      const addedNote = await addNote({ text: "" });
      setNotes([...notes, { ...addedNote, toEdit: true }]);
    },
    [notes]
  );
  // const renderNotes = ({ notes }) => {
  //   return notes.map((note) => (
  //     <EditableNote key={note.id} note={note} toEdit={note.toEdit} />
  //   ));
  // };

  const renderNotes = useCallback(({ notes }) => {
    return notes.map((note) => (
      <EditableNote key={note.id} note={note} toEdit={note.toEdit} />
    ));
  });

  return (
    <div id="crime-board" onDoubleClick={handleDoubleClick}>
      <div id="notes-container">{renderNotes({ notes })}</div>
    </div>
  );
}
