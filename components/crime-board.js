import { useState, useCallback } from "react";
import { useDrop } from "react-dnd";

import { ItemTypes } from "../lib/item-types";
import { addNote } from "../lib/notes";
import normalizeArray from "../lib/normalize-array";
import EditableNote from "../components/editable-note";
import DraggableNote from "../components/draggable-note";

function renderNote(note) {
  return <DraggableNote key={note.id} note={note} />;
}

function prepareNotes(notes) {
  const savedNotes = notes.map((note) => {
    return { ...note, top: 0, left: 0, toEdit: false };
  });
  return normalizeArray(savedNotes, "id")
}

export default function CrimeBoard(props) {
  const [notes, setNotes] = useState(prepareNotes(props.notes));
  const [, drop] = useDrop({
    accept: ItemTypes.NOTE,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      let left = Math.round(item.left + delta.x);
      let top = Math.round(item.top + delta.y);
      // moveNote()
      return undefined;
    },
  });

  const handleDoubleClick = useCallback(
    async (e) => {
      const addedNote = await addNote({ text: "" });
      setNotes([...notes, { ...addedNote, toEdit: true }]);
    },
    [notes]
  );

  return (
    <div id="crime-board" ref={drop} onDoubleClick={handleDoubleClick}>
      {Object.keys(notes).map((key) => renderNote(notes[key]))}
    </div>
  );
}
