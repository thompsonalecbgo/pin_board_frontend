import { useCallback } from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";

import { ItemTypes } from "../lib/item-types";
import { addNote, editNote } from "../lib/notes";
import { useNotes } from "../lib/notes-provider";
import { useLinks } from "../lib/links-provider";
import DraggableNote from "../components/draggable-note";
import LinkTo from "../components/link-to";

const pinFromTop = 10;
const pinWidthHalf = 7 / 2;
const noteWidthHalf = 200 / 2;

export function renderLink(note1, note2) {
  const x = note1.left;
  const y = note1.top;
  const x1 = note2.left;
  const y1 = note2.top;
  return (
    <LinkTo
      key={note1.id}
      x={x}
      y={y}
      x1={x1}
      y1={y1}
      offsetX={x1 + noteWidthHalf + pinWidthHalf}
      offsetY={y1 + pinWidthHalf + pinFromTop}
    />
  );
}

function renderNote(note) {
  return <DraggableNote key={note.id} note={note} />;
}

export default function CrimeBoard() {
  const [notes, setNotes] = useNotes();
  const [links, setLinks] = useLinks();

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

  const handleDoubleClick = useCallback(
    async (e) => {
      const addedNote = await addNote({ text: "" });
      setNotes(
        update(notes, {
          [addedNote.id]: {
            $set: {
              ...addedNote,
              top: e.pageY - e.target.offsetTop,
              left: e.pageX,
              toEdit: true,
            },
          },
        })
      );
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

  return (
    <div id="crime-board" ref={drop} onDoubleClick={handleDoubleClick}>
      {Object.keys(notes).map((key) => renderNote(notes[key]))}
      {Object.keys(notes).map((key) => {
        if (!links[key]) {
          return null;
        } else {
          return renderLink(notes[links[key]], notes[key]);
        }
      })}
    </div>
  );
}

// TODO: if notes is gone delete link