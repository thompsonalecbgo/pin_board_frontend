import { useEffect, useState, useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";
import update from "immutability-helper";

import { editNote, deleteNote } from "../lib/notes";
import { useNotes } from "../lib/notes-provider";
import DraggablePin from "../components/draggable-pin";

export default function EditableNote({ note }) {
  let inputRef;
  const [notes, setNotes] = useNotes();
  const [text, setText] = useState(note.text);
  const [isEditing, setEditing] = useState(note.toEdit);

  const handleDoubleClick = useCallback(
    (e) => {
      e.stopPropagation();
      setEditing(true);
      setNotes(
        update(notes, {
          [note.id]: {
            $merge: { isEdit: true },
          },
        })
      );
    },
    [notes, note]
  );
  const handleChange = useCallback((e) => {
    setText(e.target.value);
  });
  const handleBlur = useCallback(
    (e) => {
      setEditing(false);
      setNotes(
        update(notes, {
          [note.id]: {
            $merge: { text: e.target.value, isEdit: false },
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
      setNotes(
        update(notes, {
          $unset: [note.id],
        })
      );
      deleteNote({ id: note.id });
    },
    [notes, note]
  );

  useEffect(() => {
    if (isEditing) {
      inputRef.focus();
    }
  }, [isEditing]);

  const savedNote = (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        style={{ position: "absolute", right: "0" }}
        className="delete-btn"
        onClick={handleBtnClick}
      >
        &#10006;
      </button>
      <div className="note" onDoubleClick={handleDoubleClick}>
        {text}
      </div>
      <DraggablePin note={note} />
    </div>
  );
  const noteEditor = (
    <TextareaAutosize
      ref={(tag) => (inputRef = tag)}
      className="edit-note"
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
  return <>{isEditing ? noteEditor : savedNote}</>;
  // if (!text && !isEditing) {
  //   return null;
  // } else {
  //   return <>{isEditing ? noteEditor : savedNote}</>;
  // }
}
