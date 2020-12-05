import { useEffect, useState, useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";
import update from "immutability-helper";

import { editNote } from "../lib/notes";
import { useNotes } from "../lib/notes-provider";

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

  useEffect(() => {
    if (isEditing) {
      inputRef.focus();
    }
  }, [isEditing]);

  const savedNote = (
    <div className="note" onDoubleClick={handleDoubleClick}>
      {text}
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
  if (!text && !isEditing) {
    return null;
  } else {
    return <>{isEditing ? noteEditor : savedNote}</>;
  }
}
