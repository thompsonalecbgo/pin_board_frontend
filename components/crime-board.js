import { useState, useCallback } from "react";
import { useDrop, useDragLayer } from "react-dnd";
import update from "immutability-helper";

import { ItemTypes } from "../lib/item-types";
import { addNote } from "../lib/notes";
import normalizeArray from "../lib/normalize-array";
import DraggableNote from "../components/draggable-note";

function renderNote(note) {
  return <DraggableNote key={note.id} note={note} />;
}

export function prepareNotes(notes) {
  const savedNotes = notes.map((note) => {
    return { ...note, top: 0, left: 0, toEdit: false };
  });
  return normalizeArray(savedNotes, "id");
}

export default function CrimeBoard(props) {
  const [notes, setNotes] = useState(prepareNotes(props.notes));

  const moveNote = useCallback((id, left, top) => {
    setNotes(
      update(notes, {
        [id]: {
          $merge: { left, top },
        },
      })
    );
  });

  const [, drop] = useDrop({
    accept: ItemTypes.NOTE,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      let left = Math.round(item.left + delta.x);
      let top = Math.round(item.top + delta.y);
      moveNote(item.id, left, top);
      return undefined;
    },
  });

  const handleDoubleClick = useCallback(
    async (e) => {
      console.log(e)
      const addedNote = await addNote({ text: "" });
      const addedNoteId = addedNote.id;
      setNotes({
        ...notes,
        [addedNoteId]: {
          ...addedNote,
          toEdit: true,
          top: e.pageY - (e.target.offsetTop * 2),
          left: e.pageX,
        },
      });
    },
    [notes]
  );

  return (
    <div id="crime-board" ref={drop} onDoubleClick={handleDoubleClick}>
      {Object.keys(notes).map((key) => renderNote(notes[key]))}
    </div>
  );
}
