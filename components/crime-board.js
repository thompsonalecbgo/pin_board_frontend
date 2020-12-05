import { useCallback } from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";

import { ItemTypes } from "../lib/item-types";
import { addNote, editNote } from "../lib/notes";
import { useNotes } from "../lib/notes-provider";
import DraggableNote from "../components/draggable-note";

function renderNote(note) {
  return <DraggableNote key={note.id} note={note} />;
}

export default function CrimeBoard() {
  const [notes, setNotes] = useNotes();

  const moveNote = useCallback(
    (movedNote, left, top) => {
      setNotes(
        update(notes, {
          [movedNote.id]: {
            $merge: { left, top },
          },
        })
      );
      editNote({
        id: movedNote.id,
        text: movedNote.text,
        top,
        left,
      });
    },
    [notes]
  );

  const [, drop] = useDrop({
    accept: ItemTypes.NOTE,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      let left = Math.round(item.note.left + delta.x);
      let top = Math.round(item.note.top + delta.y);
      moveNote(item.note, left, top);
      return undefined;
    },
  });

  const handleDoubleClick = useCallback(
    async (e) => {
      const addedNote = await addNote({ text: "" });
      setNotes(
        update(notes, {
          [addedNote.id]: {
            $set: {
              ...addedNote,
              top: e.pageY - e.target.offsetTop * 2,
              left: e.pageX,
              toEdit: true,
            },
          },
        })
      );
    },
    [notes]
  );

  return (
    <div id="crime-board" ref={drop} onDoubleClick={handleDoubleClick}>
      {Object.keys(notes).map((key) => renderNote(notes[key]))}
    </div>
  );
}
