import { useEffect, useState, useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";
import update from "immutability-helper";

import DraggablePin from "../components/draggable-pin";
import { useNotes } from "../lib/notes-provider";
import { editNote, deleteNote } from "../lib/notes";
import { noteWidth } from "../lib/item-sizes";

const styles = {
  width: `${noteWidth}px`,
};

export function Note({ text }) {
  return (
    <div className="note" style={styles}>
      {text}
    </div>
  );
}

export default function EditableNote({ note }) {
  let inputRef;
  const [notes, setNotes] = useNotes();
  // const [text, setText] = useState(note.text);
  // const [isEditing, setEditing] = useState(note.isEdit);

  const handleDoubleClick = useCallback(
    (e) => {
      console.log("Note to edit");
      e.stopPropagation();
      // setEditing(true);
      setNotes(
        update(notes, {
          [note.id]: {
            $merge: { isEdit: true },
          },
          ["dateUpdated"]: {
            $set: new Date().toString(),
          },
        })
      );
    },
    [notes, note]
  );

  const handleChange = useCallback(
    (e) => {
      // setText(e.target.value);
      setNotes(
        update(notes, {
          [note.id]: {
            $merge: { text: e.target.value },
          },
          ["dateUpdated"]: {
            $set: new Date().toString(),
          },
        })
      );
    },
    [notes, note]
  );

  const handleBlur = useCallback(
    (e) => {
      console.log("Note edited");
      e.stopPropagation();
      // setText(e.target.value);
      // setEditing(false);
      setNotes(
        update(notes, {
          [note.id]: {
            $merge: { text: e.target.value, isEdit: false },
          },
          ["dateUpdated"]: {
            $set: new Date().toString(),
          },
        })
      );
      editNote({
        id: note.id,
        top: note.top,
        left: note.left,
        text: e.target.value,
      });
    },
    [notes, note]
  );

  const handleFocus = useCallback((e) => {
    var temp_value = e.target.value;
    e.target.value = "";
    e.target.value = temp_value;
  });

  const handleBtnClick = useCallback(
    (e) => {
      console.log("Note deleted");
      setNotes(
        update(notes, {
          $unset: [note.id],
          ["dateUpdated"]: {
            $set: new Date().toString(),
          },
        })
      );
      deleteNote({ id: note.id });
    },
    [notes, note]
  );

  useEffect(() => {
    if (note.isEdit) {
      inputRef.focus();
    }
  }, [note.isEdit]);

  const btnAndPin = (
    <>
      <button
        type="button"
        style={{ position: "absolute", right: "0", top: "0" }}
        className="delete-btn"
        onClick={handleBtnClick}
      >
        &#10006;
      </button>
      <DraggablePin note={note} />
    </>
  );

  const savedNote = (
    <div style={{ position: "relative" }} onDoubleClick={handleDoubleClick}>
      <Note text={note.text} />
      {btnAndPin}
    </div>
  );

  const noteEditor = (
    <div style={{ position: "relative" }}>
      <TextareaAutosize
        ref={(tag) => (inputRef = tag)}
        className="edit-note"
        style={styles}
        value={note.text}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      {btnAndPin}
    </div>
  );

  return <>{note.isEdit ? noteEditor : savedNote}</>;
}
